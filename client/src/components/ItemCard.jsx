import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea onClick={() => navigate(`/items/${item._id}`)}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {item?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item?.likes.length}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
