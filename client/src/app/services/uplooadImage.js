import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadImageApi = createApi({
  reducerPath: "uploadImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_CLOUDINARY_URL+import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  }),
  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (credentials) => ({
        url: "/image/upload",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useUploadMutation } = uploadImageApi;
