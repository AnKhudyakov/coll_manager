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
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
// import { useRemoveItemMutation } from "@/app/services/item";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  // const [removeItem, { isLoading }] = useRemoveItemMutation();
  // const handleDeleteItem = () => {
  //   removeItem(item._id);
  // };
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <CardActionArea onClick={() => navigate(`/items/${item._id}`)}>
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {item?.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item?.likes.length}
            </Typography>
            {/* <IconButton sx={{ color: "rgba(255, 255, 255, .8)" }}>

          </IconButton> */}
          </CardContent>
        </CardActionArea>
        {/* <Box>
        <IconButton aria-label="delete" onClick={handleDeleteItem}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteItem}>
          <DeleteIcon />
        </IconButton>
        </Box> */}
      </Box>
    </Card>
  );
};

export default ItemCard;
