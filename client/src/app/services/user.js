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

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithError(import.meta.env.VITE_API_URL),
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
      providesTags: ["User"],
    }),
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
  useRemoveUserMutation,
  useUpdateUserMutation,
} = userApi;
