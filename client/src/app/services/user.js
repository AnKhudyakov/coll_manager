import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helpers/auth";

export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),
    // postUser: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/users",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  //usePostUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = userApi;
