import { useAddLikeMutation } from "@/app/services/item";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, IconButton, Typography } from "@mui/material";

const Likes = ({ user, item }) => {
  const [addLike, { isLoading: isUpdating }] = useAddLikeMutation();
  return (
    <Box display="flex" alignItems="center" px={2} height={"50%"}>
      <Typography variant="body2" color="text.secondary" textAlign="center">
        {item?.likes.length}
      </Typography>
      <IconButton
        aria-label="edit"
        onClick={() => addLike({ id: item._id, like: user._id }).unwrap()}
        disabled={item?.likes.includes(user?._id)||!user}
      >
        <FavoriteIcon />
      </IconButton>
    </Box>
  );
};

export default Likes;
