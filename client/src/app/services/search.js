import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    search: builder.query({
      query: (text) => ({
        url: `/search?text=${text}`,
      }),
      providesTags: ["Search"],
    }),
  }),
});

export const { useSearchQuery } = searchApi;
