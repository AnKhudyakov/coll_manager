import { useUpdateItemMutation } from "@/app/services/item";
import { selectCurrentUser } from "@/features/auth/authSlice";
import Likes from "@/features/likes/Likes";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
            {item?.customFields.map((field, index) => (
              <Box key={index}>
                {(field.fieldType === "text" || field.fieldType === "data") && (
                  <Typography gutterBottom variant="h5" component="div">
                    {...Object.keys(field)[0]}: {...Object.values(field)[0]}
                  </Typography>
                )}
              </Box>
            ))}
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
              </Box>
            )}
          </CardContent>
        </CardActionArea>
        <Divider orientation="vertical" variant="middle" flexItem />
        {user && <Likes item={item} user={user} />}
      </Box>
    </Card>
  );
};

export default ItemCard;
