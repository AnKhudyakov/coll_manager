import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helpers/auth";
import { setRefresh } from "@/features/auth/authSlice";

const baseQueryWithError = (baseUrl) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getToken() ? getToken() : getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });
  return async (args, api, extraOptions) => {
    const { error, data } = await baseQuery(args, api, extraOptions);
    if (error && error.status == 401) {
      api.dispatch(setRefresh(true));
      return { error: { status: error.status, data: error.data } };
    }
    api.dispatch(setRefresh(false));
    return { data };
  };
};

export const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: baseQueryWithError(import.meta.env.VITE_API_URL),
  tagTypes: ["Items"],
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ limit, sort_by, sort_order }) => ({
        url: `/items?limit=${limit}&&sort_by=${sort_by}&sort_order=${sort_order}`,
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
