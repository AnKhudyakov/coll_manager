import { Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAddLikeMutation } from "@/app/services/item";

const Likes = ({ user, item }) => {
  const [addLike, { isLoading: isUpdating }] = useAddLikeMutation();
  return (
    <Box display="flex" alignItems="center" px={2}>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {item?.likes.length}
      </Typography>
      <IconButton
        aria-label="edit"
        onClick={() => addLike({ id: item._id, like: user._id }).unwrap()}
        disabled={item?.likes.includes(user?._id)}
      >
        <FavoriteIcon />
      </IconButton>
    </Box>
  );
};

export default Likes;
