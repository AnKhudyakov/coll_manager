import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';

const CollectionCard = ({ collection, variant }) => {
  const navigate = useNavigate();
  const isNonTablet = useMediaQuery("(min-width:900px)");
  const cardWidth =
    isNonTablet && variant !== "page" ? "calc(50% - 0.5rem)" : "100%";
  const imageWidth = !isNonTablet || variant !== "page" ? "40%" : "20%";
  return (
    <Card sx={{ width: `${cardWidth}` }}>
      <CardActionArea
        onClick={() => navigate(`/collections/${collection._id}`)}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        <CardMedia
          component="img"
          image={collection?.image}
          alt="Collection image"
          sx={{ width: `${imageWidth}`, height: "200px" }}
        />
        <CardContent sx={{ width: "50%", height: "100%" }}>
          <Typography gutterBottom variant="h3" component="div">
            {collection?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {collection?.topic}
          </Typography>
          <MDEditor.Markdown source={collection?.description} style={{ backgroundColor: 'inherit', color:"inherit" }} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CollectionCard;
