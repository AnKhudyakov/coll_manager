import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helpers/auth";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken() ? getToken() : getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tag"],
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: "/tags",
      }),
      providesTags: ["Tags"],
    }),
    getTagById: builder.query({
      query: (id) => ({
        url: `/tags/${id}`,
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetTagByIdQuery,
} = tagApi;
