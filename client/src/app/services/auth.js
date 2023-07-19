import { getRefreshToken } from "@/helpers/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    reg: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "/auth/refresh",
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getRefreshToken()}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegMutation,
  useRefreshTokenQuery,
  useLazyRefreshTokenQuery,
  useLogoutMutation,
} = authApi;
