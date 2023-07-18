import { getRefreshToken } from "@/helpers/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setRelogin } from "@/features/auth/authSlice";

const baseQueryWithError = (baseUrl) => {
  const baseQuery = fetchBaseQuery({ baseUrl });
  return async (args, api, extraOptions) => {
    const { error, data } = await baseQuery(args, api, extraOptions);
    if (error && error.status == 401) {
      api.dispatch(setRelogin(true));
      return { error: { status: error.status, data: error.data } };
    }
    api.dispatch(setRelogin(false));
    return { data };
  };
};

export const authApi = createApi({
  reducerPath: "authAPI",
  baseQuery: baseQueryWithError(import.meta.env.VITE_API_URL),
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
    refresh: builder.query({
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
  useRefreshQuery,
  useLogoutMutation,
} = authApi;
