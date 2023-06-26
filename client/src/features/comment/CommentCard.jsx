import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useUpdateItemMutation } from "@/app/services/item";
import Likes from "@/features/likes/Likes";
import formatDate from "@/helpers/formatDate";

const CommentCard = ({ comment }) => {
  //const user = useSelector(selectCurrentUser);
  //const navigate = useNavigate();
  //const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
  return (
    <Card>
      <Box display="flex" alignItems="center" maxWidth="800px">
        {/* <CardActionArea onClick={() => navigate(`/items/${item._id}`)}> */}
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Box width={"150px"}>
            <Typography gutterBottom variant="h4" component="div">
              {comment?.author}
            </Typography>
            <Typography>{comment?.createdAt?.slice(0, 10)}</Typography>
            <Typography>{comment?.createdAt?.slice(11, 19)}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box px={2} maxWidth={"500px"}>
            <Typography>{comment?.content}</Typography>
          </Box>
        </CardContent>
        {/* </CardActionArea> */}
      </Box>
    </Card>
  );
};

export default CommentCard;
