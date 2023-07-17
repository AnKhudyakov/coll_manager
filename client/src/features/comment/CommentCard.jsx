import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const CommentCard = ({ comment }) => {
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  return (
    <Card>
      <Box>
        <CardContent>
          <Box
            p={1}
            display={"flex"}
            alignItems={"flex-end"}
            justifyContent={"space-between"}
          >
            <Typography variant="h3" component="div">
              {comment?.author?.username
                ? comment?.author.username
                : t("deletedUser")}
            </Typography>
            <Typography color="text.secondary">
              {comment?.createdAt?.slice(0, 10)}{" "}
              {comment?.createdAt?.slice(11, 19)}
            </Typography>
          </Box>
          <Divider orientation="horizontal" flexItem />
          <Box p={2} maxWidth={"500px"}>
            <Typography>{comment?.content}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CommentCard;
