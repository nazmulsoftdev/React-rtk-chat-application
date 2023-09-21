import { apiSlice } from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (userEmail) => `/users?email=${userEmail}`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
