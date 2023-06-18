import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helpers/auth";

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken()
        ? getToken()
        : getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Collection"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => ({
        url: "/items",
      }),
      providesTags: ["Items"],
    }),
    getItemById: builder.query({
      query: (id) => ({
        url: `/items/${id}`,
      }),
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
    }),
    updateItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "PATCH",
      }),
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
} = itemApi;
