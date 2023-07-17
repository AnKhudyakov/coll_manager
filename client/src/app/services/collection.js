import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helpers/auth";

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken() ? getToken() : getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Collections"],
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: ({ limit, sort_by, sort_order }) => ({
        url: `/collections?limit=${limit}&&sort_by=${sort_by}&sort_order=${sort_order}`,
      }),
      providesTags: ["Collections"],
    }),
    getCollectionsByUser: builder.query({
      query: (id) => ({
        url: `/collections/user/${id}`,
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
  useGetCollectionsByUserQuery,
  useGetCollectionByIdQuery,
  usePostCollectionMutation,
  useRemoveCollectionMutation,
  useUpdateCollectionMutation,
} = collectionApi;
