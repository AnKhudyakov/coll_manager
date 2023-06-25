import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { useUpdateItemMutation } from "@/app/services/item";
import Likes from "@/features/likes/Likes";

const ItemCard = ({ item, variant }) => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();

  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardActionArea onClick={() => navigate(`/items/${item._id}`)}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              {item?.name}
            </Typography>
            {variant === "last" && (
              <Box>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  color="secondary"
                >
                  {item?.collectionId}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.author}
                </Typography>
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        {user && <Likes item={item} user={user} />}
      </Box>
    </Card>
  );
};

export default ItemCard;
