import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://demochatserver.onrender.com",
  prepareHeaders: async (headers, { getState }) => {
    const token = getState()?.auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(UserLoggedOut());
      localStorage.clear();
    }

    return result;
  },
  tagTypes: [],
  endpoints: (builder) => ({}),
});
