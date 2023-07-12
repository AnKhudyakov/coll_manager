import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserId } from "@/helpers/auth";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_WS,
  }),
  endpoints: (builder) => ({
    initialRequest: builder.mutation({
      query: (comment) => ({
        url: "/",
        method: "POST",
        body: comment,
      }),
    }),
    getComments: builder.query({
      query: () => "/",
    }),
  }),
});

export const connectSocket = (setSocket, setComments, item) => {
  const socket = new WebSocket(import.meta.env.VITE_API_WS);
  setSocket(socket);
  socket.onopen = () => {
    console.log("WS Connected");
    const message = {
      event: "connection",
      id: getUserId(),
      itemId: item._id,
    };
    socket.send(JSON.stringify(message));
  };
  socket.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    switch (msg.event) {
      case "comments":
        setComments(msg.comments);
        break;
      case "comment":
        setComments((prev) => [...prev, msg.comment]);
        break;
    }
  };
  socket.onclose = () => {
    console.log("WS Connection closed");
  };
  socket.onerror = () => {
    console.log("WS Connection died");
  };
};

export const { useWsEndpointQuery, useInitialRequestMutation } = commentApi;
