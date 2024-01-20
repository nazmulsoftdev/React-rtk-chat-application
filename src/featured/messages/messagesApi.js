import { apiSlice } from "../api/apiSlice";
import io from "socket.io-client";

const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${
          import.meta.env.VITE_MESSAGES_LIMIT_LIST
        }`,
      transformResponse(responseApi, meta) {
        const totalCount = meta.response.headers.get("X-Total-Count");
        return {
          data: responseApi,
          totalCount,
        };
      },
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch }
      ) {
        //create client socket

        const socket = io("https://demochatserver.onrender.com", {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttempts: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });

        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            updateCachedData((draft) => {
              draft.data.push(data?.data);
            });
          });
        } catch (err) {
          //
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getMoreMessages: builder.query({
      query: ({ id, page }) =>
        `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${
          import.meta.env.VITE_MESSAGES_LIMIT_LIST
        }`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const messages = await queryFulfilled;

          if (messages?.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData("getMessages", arg.id, (draft) => {
                return {
                  data: [...draft.data, ...messages.data],
                  totalCount: draft.totalCount,
                };
              })
            );
          } else {
            //
          }
        } catch (err) {
          //
        }
      },
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useGetMoreMessagesQuery,
} = messagesApi;

export default messagesApi;
