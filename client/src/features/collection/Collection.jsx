import { useRemoveCollectionMutation } from "@/app/services/collection";
import { selectCurrentUser } from "@/features/auth/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CollectionForm from "./CollectionForm";
import MDEditor from "@uiw/react-md-editor";

const Collection = ({ collection, variant }) => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const user = useSelector(selectCurrentUser);
  const isNonTablet = useMediaQuery("(min-width:900px)");
  const cardWidth =
    isNonTablet && variant !== "page" ? "calc(50% - 0.5rem)" : "100%";
  const imageWidth = !isNonTablet || variant !== "page" ? "40%" : "20%";
  const [removeCollection, { isLoading }] = useRemoveCollectionMutation();
  const handleDeleteItem = () => {
    removeCollection(collection._id);
    navigate(`/profile/${user._id}`);
  };

  return (
    <>
      <Card
        sx={{
          width: `${cardWidth}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 3,
        }}
      >
        <CardMedia
          component="img"
          image={collection?.image}
          alt="Collection image"
          sx={{ width: `${imageWidth}`, height: "200px" }}
        />
        <CardContent sx={{ width: "100%", height: "100%" }}>
          <Typography gutterBottom variant="h3" component="div">
            {collection?.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {collection?.topic}
          </Typography>
          <MDEditor.Markdown source={collection?.description} />
        </CardContent>
        {(collection?.author === user?._id || user?.admin) && (
          <Box>
            <Box>
              <IconButton aria-label="edit" onClick={() => setOpenForm(true)}>
                <EditIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton aria-label="delete" onClick={handleDeleteItem}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Card>
      {openForm && (
        <CollectionForm
          variant="edit"
          setOpenForm={setOpenForm}
          collection={collection}
        />
      )}
    </>
  );
};

export default Collection;
