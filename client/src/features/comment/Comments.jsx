import {
  useGetItemsByCollectionQuery,
  useGetItemsQuery,
} from "@/app/services/item";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { getUserId } from "@/helpers/auth";
import { selectCurrentUser } from "@/features/auth/authSlice";

const Comments = ({ item }) => {
  const [socket, setSocket] = useState(null);
  const [comments, setComments] = useState([]);
  const user = useSelector(selectCurrentUser);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    if (item) {
      const socket = new WebSocket(import.meta.env.VITE_API_WS);
      setSocket(socket);
      socket.onopen = () => {
        setConnected(true);
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
        alert("Connection closed");
        setConnected(false);
      };
      socket.onerror = () => {
        alert("Connection died");
      };
      // return () => {
      //   socket.close()
      // };
    }
  }, []);
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      {/* {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100vh"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <> */}
      {!comments?.length ? (
        <Typography variant="h4" color="text.secondary">Comments not found.</Typography>
      ) : (
        <></>
      )}
      {comments?.map((comment) => (
        <Box key={comment._id}>
          <CommentCard comment={comment} />
        </Box>
      ))}
      {/* </>
      )} */}
      {user&&<CommentForm socket={socket} itemId={item?._id} />}
    </Box>
  );
};

export default Comments;
