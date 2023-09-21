import { apiSlice } from "../api/apiSlice";
import messagesApi from "../messages/messagesApi";
import io from "socket.io-client";
const conversationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=${
          import.meta.env.VITE_CONVERSATIONS_LIMIT_LIST
        }`,

      transformResponse(apiResponse, meta) {
        const totalCount = meta.response.headers.get("X-Total-Count");
        return {
          data: apiResponse,
          totalCount,
        };
      },

      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch }
      ) {
        // create socket client
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
          socket.on("conversation", (data) => {
            updateCachedData((draft) => {
              const conversation = draft.data.find(
                (c) => c.id == data?.data?.id
              );
              if (conversation?.id) {
                conversation.message = data?.data?.message;
                conversation.timestamp = data?.data?.timestamp;
              } else {
                //
              }
            });
          });
        } catch (err) {
          //
        }
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    getMoreConversations: builder.query({
      query: ({ email, page }) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=${page}&_limit=${
          import.meta.env.VITE_CONVERSATIONS_LIMIT_LIST
        }`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const conversations = await queryFulfilled;

          if (conversations?.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getConversations",
                arg.email,
                (draft) => {
                  return {
                    data: [...draft.data, ...conversations.data],
                    totalCount: draft.totalCount,
                  };
                }
              )
            );
          } else {
            //
          }
        } catch (err) {
          //
        }
      },
    }),
    getConversationSileItem: builder.query({
      query: (id) => `/conversations?id=${id}`,
    }),
    getConversation: builder.query({
      query: ({ userEmail, particepentEmail }) =>
        `/conversations?participants_like=${userEmail}-${particepentEmail}&&participants_like=${particepentEmail}-${userEmail}`,
    }),
    addConversation: builder.mutation({
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //  optimistic cache update

        const addCacheupdate = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender,
            (draft) => {
              draft.data.push(arg.data);
            }
          )
        );

        try {
          let conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            // silent entry in messages api

            const users = arg?.data?.users;

            const senderUser = users?.find(
              (user) => user.email === arg?.sender
            );

            const receiverUser = users?.find(
              (user) => user?.email !== arg?.sender
            );

            dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg?.data.message,
                timestamp: arg?.data?.timestamp,
              })
            );
          }
        } catch (err) {
          addCacheupdate.undo();
        }
      },
    }),
    editConversation: builder.mutation({
      query: ({ id, sender, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // Optimistic cache update for edit conversation
        const editCacheUpdate = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            arg.sender,
            (draft) => {
              const draftConversation = draft.data.find((c) => c.id == arg.id);

              draftConversation.message = arg.data.message;

              draftConversation.timestamp = arg.data.timestamp;
            }
          )
        );

        try {
          let conversation = await queryFulfilled;
          if (conversation?.data?.id) {
            // silent entry in messages api

            const users = arg?.data?.users;

            const senderUser = users?.find(
              (user) => user.email === arg?.sender
            );

            const receiverUser = users?.find(
              (user) => user?.email !== arg?.sender
            );

            dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg?.data.message,
                timestamp: arg?.data?.timestamp,
              })
            );

            //Pessimistic  update
            // dispatch(
            //   apiSlice.util.updateQueryData(
            //     "getMessages",
            //     res.conversationId.toString(),
            //     (draft) => {
            //       draft.push(res);
            //     }
            //   )
            // );
          }
        } catch (err) {
          editCacheUpdate.undo();
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMoreConversationsQuery,
  useGetConversationSileItemQuery,
  useGetConversationQuery,
  useAddConversationMutation,
  useEditConversationMutation,
} = conversationApi;

export default conversationApi;
