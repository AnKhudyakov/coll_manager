import { useAddLikeMutation } from "@/app/services/item";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, CircularProgress, IconButton, Typography, useMediaQuery } from "@mui/material";

const Likes = ({ user, item }) => {
  const [addLike, { isLoading }] = useAddLikeMutation();
  const isNonMobile = useMediaQuery("(min-width:740px)");
  return (
    <Box display={"flex"} flexDirection={isNonMobile?"column":"row"} alignItems={"center"}>
      <Box display="flex" alignItems="center" px={2} height={"50%"}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {item?.likes.length}
        </Typography>
        <IconButton
          aria-label="edit"
          onClick={() => addLike({ id: item._id, like: user._id }).unwrap()}
          disabled={item?.likes.includes(user?._id) || !user}
        >
          <FavoriteIcon />
        </IconButton>
      </Box>
      {isLoading && <CircularProgress size={20} />}
    </Box>
  );
};

export default Likes;
