import { setRefresh } from "@/features/auth/authSlice";
import { getToken } from "@/helpers/auth";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithErrorAndAuth = (baseUrl) => {
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
