import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardActionArea
        onClick={() => navigate(`/collections/${collection._id}`)}
      sx={{display:"flex", justifyContent:"flex-start", alignItems:"flex-start"}}
      >
        <CardMedia
          component="img"
          image={collection?.image}
          alt="Collection image"
          sx={{width:"140px", height:"140px"}}
        />
        <CardContent sx={{width:"100%", height:"100%"}}>
          <Typography gutterBottom variant="h3" component="div">
            {collection?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {collection?.topic}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {collection?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;
