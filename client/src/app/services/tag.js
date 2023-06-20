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
    // getItemsByItem: builder.query({
    //   query: (id) => ({
    //     url: `/tags/item/${id}`,
    //   }),
    //   providesTags: ["Tags"],
    // }),
    // postItem: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/items",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   invalidatesTags: ["Tags"],
    // }),
    // removeItem: builder.mutation({
    //   query: (id) => ({
    //     url: `/items/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Tags"],
    // }),
    // updateItem: builder.mutation({
    //   query: (id) => ({
    //     url: `/items/${id}`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: ["Tags"],
    // }),
  }),
});

export const {
  useGetTagsQuery,
  //useGetItemsByUserQuery,
  // useGetItemsByCollectionQuery,
  useGetTagByIdQuery,
  // usePostItemMutation,
  // useRemoveItemMutation,
  // useUpdateItemMutation,
} = tagApi;
