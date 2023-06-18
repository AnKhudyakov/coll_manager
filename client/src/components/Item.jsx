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

const Item = ({ item }) => {
  const navigate = useNavigate();
  return (
    <>
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {item?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes:{item?.likes.length}
        </Typography>
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            Tags:
          </Typography>
          {item?.tags.map((tag) => (
            <Button key={tag} onClick={() => navigate(`/search?text=${tag}`)}>
              #{tag}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
    <Box p={2}>
      <Typography>
        Comments
      </Typography>
    </Box>
    </>
  );
};

export default Item;
