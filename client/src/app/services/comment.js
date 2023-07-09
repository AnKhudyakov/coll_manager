import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_WS,
  }),
  endpoints: (builder) => ({
    initialRequest: builder.mutation({
      query: (comment) => ({
        url: "/",
        method: "POST",
        body: comment,
      }),
    }),
    getComments: builder.query({
      query: () => "/",
    }),
  }),
});

export const {
  useWsEndpointQuery,
  useInitialRequestMutation,
} = commentApi;
