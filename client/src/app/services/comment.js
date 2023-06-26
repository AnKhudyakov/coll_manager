import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/helpers/auth";

// const socket = new WebSocket(import.meta.env.VITE_API_WS);
// console.log(import.meta.env.VITE_API_URL);

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_WS,
    // websocket: WebSocket,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getToken() ? getToken() : getState().auth.token;
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    initialRequest: builder.mutation({
      query: (comment) => ({
        url: "/",
        method: "POST",
        body: comment,
        // console.log("REQUEST");
        // const comment = {
        //   event: "connection",
        //   id,
        // };
        // socket.send(JSON.stringify(comment));
      }),
    }),
    getComments: builder.query({
      query: () => "/",
    }),
    // wsEndpoint: builder.query({
    //   query: () => "/",
    //   onMessageReceived:
    //     (_, { dispatch }) =>
    //     (message) => {
    //       console.log("Received message:", message);
    //       switch (message.event) {
    //         case "comments":
    //           console.log("Comments");
    //           //setComments(msg.comments);
    //           break;
    //         case "comment":
    //           console.log("Comment");
    //           //setComments((prev) => [...prev, msg.comment]);
    //           break;
    //       }
    //     },
    // }),
    // sendComment: builder.mutation({
    //   query: (message) => {
    //     const comment = {
    //       event: "comment",
    //       comment: message,
    //     };
    //     socket.send(JSON.stringify(comment));
    //   },
    // }),
  }),
});

// socket.onmessage = (event) => {
//   const msg = JSON.parse(event.data);
//   console.log("GetMSG", msg);
//   // Dispatch the received WebSocket message to the store using RTK Query
//   //commentApi.endpoints.wsEndpoint.onMessageReceived(msg);
// };

// socket.onopen = () => {
//   // Perform the WebSocket request using RTK Query
//   console.log("Connected to server");
//   //const msg = JSON.parse(event.data);
//   //commentApi.endpoints.initialRequest.onMessageReceived(msg);
// };

// socket.onclose = () => {
//   // Close the WebSocket connection and unsubscribe from updates
//   //commentApi.endpoints.getComments.unsubscribe();
//   commentApi.endpoints.getComment.unsubscribe();
// };
// console.log("API", commentApi);
// Export the RTK Query API and WebSocket connection
export const {
  //useGetCommentQuery,
  //useGetMessagesQuery,
  useWsEndpointQuery,
  // useSendCommentMutation,
  useInitialRequestMutation,
} = commentApi;
