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
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertDialog from "@/components/AlertDialog";
import CollectionForm from "./CollectionForm";

const Collection = ({ collection, variant }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const isNonTablet = useMediaQuery("(min-width:900px)");
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const cardWidth =
    isNonTablet && variant !== "page" ? "calc(50% - 0.5rem)" : "100%";
  const imageWidth = !isNonTablet || variant !== "page" ? "40%" : "20%";
  const [removeCollection, { isLoading }] = useRemoveCollectionMutation();
  const handleDeleteCollection = () => {
    removeCollection(collection._id);
    navigate(`/profile/${user._id}`);
  };

  return (
    <>
      <Card
        sx={{
          width: `${cardWidth}`,
          display: `${isNonMobile ? "flex" : "block"}`,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardMedia
          component="img"
          image={collection?.image}
          alt="Collection image"
          sx={{
            width: `${isNonMobile ? imageWidth : "100%"}`,
            height: "200px",
          }}
        />
        <CardContent
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography gutterBottom variant="h3" component="div">
              {collection?.name}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {collection?.topic}
            </Typography>
            <MDEditor.Markdown
              source={collection?.description}
              style={{ backgroundColor: "inherit", color: "inherit" }}
            />
          </Box>
          {(collection?.author === user?._id || user?.admin) && (
            <Box px={isNonMobile?1:0} >
              <Box>
                <IconButton aria-label="edit" onClick={() => setOpenForm(true)}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Box>
                <IconButton aria-label="delete" onClick={() => setOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      {openForm && (
        <Box px={1}>
        <CollectionForm
          variant="edit"
          setOpenForm={setOpenForm}
          collection={collection}
        />
        </Box>
      )}
      <AlertDialog
        open={open}
        setOpen={setOpen}
        confirmBtn={t("deleteBtn")}
        confirmText={t("confirmText")}
        confirmTitle={t("confirmTitle")}
        handleConfirm={handleDeleteCollection}
      />
    </>
  );
};

export default Collection;
