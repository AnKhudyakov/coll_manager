import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorAndAuth } from "../interpreters/baseQueryWithError";

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: baseQueryWithErrorAndAuth(import.meta.env.VITE_API_URL),
  tagTypes: ["Collections"],
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: ({ page, limit, sort_by, sort_order }) => ({
        url: `/collections?page=${page}&limit=${limit}&&sort_by=${sort_by}&sort_order=${sort_order}`,
      }),
      providesTags: ["Collections"],
    }),
    getTopCollections: builder.query({
      query: ({ limit, sort_by, sort_order }) => ({
        url: `/collections/top?limit=${limit}&&sort_by=${sort_by}&sort_order=${sort_order}`,
      }),
      providesTags: ["Collections"],
    }),
    getCollectionsByUser: builder.query({
      query: ({ id, page, limit, sort_by, sort_order }) => ({
        url: `/collections/user/${id}?page=${page}&limit=${limit}&&sort_by=${sort_by}&sort_order=${sort_order}`,
      }),
      providesTags: ["Collections"],
    }),
    getCollectionById: builder.query({
      query: (id) => ({
        url: `/collections/${id}`,
      }),
      providesTags: ["Collections"],
    }),
    postCollection: builder.mutation({
      query: (credentials) => ({
        url: "/collections",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Collections"],
    }),
    removeCollection: builder.mutation({
      query: (id) => ({
        url: `/collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collections"],
    }),
    updateCollection: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/collections/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Collections"],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetTopCollectionsQuery,
  useGetCollectionsByUserQuery,
  useGetCollectionByIdQuery,
  usePostCollectionMutation,
  useRemoveCollectionMutation,
  useUpdateCollectionMutation,
} = collectionApi;
