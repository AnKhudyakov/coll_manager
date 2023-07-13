import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const CommentCard = ({ comment }) => {
  return (
    <Card>
      <Box>
        <CardContent >
          <Box p={1} display={"flex"} alignItems={"flex-end"} justifyContent={"space-between"}>
            <Typography variant="h3" component="div">
              {comment?.author.username}
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
