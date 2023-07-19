import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorAndAuth } from "../interpreters/baseQueryWithError";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: baseQueryWithErrorAndAuth(import.meta.env.VITE_API_URL),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ limit, sort_by, sort_order }) => ({
        url: `/items?limit=${limit}&sort_by=${sort_by}&sort_order=${sort_order}`,
      }),
      providesTags: ["Items"],
    }),
    getItemById: builder.query({
      query: (id) => ({
        url: `/items/${id}`,
      }),
      providesTags: ["Items"],
    }),
    getItemsByUser: builder.query({
      query: (id) => ({
        url: `/items/user/${id}`,
      }),
      providesTags: ["Items"],
    }),
    getItemsByCollection: builder.query({
      query: (id) => ({
        url: `/items/collection/${id}`,
      }),
      providesTags: ["Items"],
    }),
    postItem: builder.mutation({
      query: (credentials) => ({
        url: "/items",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Items"],
    }),
    removeItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Items"],
    }),
    updateItem: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/items/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Items"],
    }),
    addLike: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/items/${id}/like`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Items"],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemsByUserQuery,
  useGetItemsByCollectionQuery,
  useGetItemByIdQuery,
  usePostItemMutation,
  useRemoveItemMutation,
  useUpdateItemMutation,
  useAddLikeMutation,
} = itemApi;
