import { selectCurrentUser } from "@/features/auth/authSlice";
import { connectSocket } from "@/app/services/comment";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

const Comments = ({ item }) => {
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  const [socket, setSocket] = useState(null);
  const [comments, setComments] = useState([]);
  const user = useSelector(selectCurrentUser);
  useEffect(() => {
    if (item) {
      connectSocket(setSocket, setComments, item);
    }
  }, []);
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      {!comments?.length && (
        <Typography variant="h4" color="text.secondary">
          {t("notFound")}
        </Typography>
      )}
      {comments?.map((comment) => (
        <Box key={comment._id}>
          <CommentCard comment={comment} />
        </Box>
      ))}
      {user && <CommentForm socket={socket} itemId={item?._id} />}
    </Box>
  );
};

export default Comments;
