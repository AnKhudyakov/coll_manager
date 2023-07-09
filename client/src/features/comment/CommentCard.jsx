import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const CommentCard = ({ comment }) => {
  return (
    <Card>
      <Box display="flex" alignItems="center" maxWidth="800px">
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Box width={"150px"}>
            <Typography gutterBottom variant="h4" component="div">
              {comment?.author.username}
            </Typography>
            <Typography>{comment?.createdAt?.slice(0, 10)}</Typography>
            <Typography>{comment?.createdAt?.slice(11, 19)}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box px={2} maxWidth={"500px"}>
            <Typography>{comment?.content}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CommentCard;
