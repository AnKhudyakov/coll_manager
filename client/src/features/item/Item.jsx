import { useRemoveItemMutation } from "@/app/services/item";
import { selectCurrentUser } from "@/features/auth/authSlice";
import Likes from "@/features/likes/Likes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import AlertDialog from "@/components/AlertDialog";

const Item = ({ item }) => {
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [removeItem, { isLoading }] = useRemoveItemMutation();
  const handleDeleteItem = () => {
    removeItem(item._id);
    navigate(`/profile/${user._id}`);
  };
  return (
    <>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "stretch",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {item.name}
            </Typography>
            {item.customFields.length ? (
              item.customFields.map((field, index) => (
                <Box key={index}>
                  {field.fieldType !== "checkbox" && (
                    <Typography gutterBottom variant="h5">
                      {Object.keys(field)[0]}: {Object.values(field)[0]}
                    </Typography>
                  )}
                </Box>
              ))
            ) : (
              <></>
            )}
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                {t("tags")}:
              </Typography>
              {item?.tags?.map((tag) => (
                <Button
                  sx={{
                    mx: 1,
                    p: 1,
                    bgcolor: "background.main",
                    color: "text.secondary",
                  }}
                  key={tag}
                  onClick={() => navigate(`/search?text=${tag}`)}
                >
                  #{tag}
                </Button>
              ))}
            </Box>
          </CardContent>
          <Box display={"flex"}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box justifySelf={"center"}>
              <Likes item={item} user={user} />
              {(item?.author === user?._id || user?.admin) && (
                <Box display={"flex"}>
                  <Box>
                    <IconButton
                      aria-label="edit"
                      onClick={() => setOpenForm(true)}
                    >
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
            </Box>
          </Box>
        </Box>
      </Card>
      {openForm && (
        <ItemForm
          variant="edit"
          setOpenForm={setOpenForm}
          collectionId={item.collectionId}
          item={item}
        />
      )}
      <AlertDialog
        open={open}
        setOpen={setOpen}
        confirmBtn={t("deleteBtn")}
        confirmText={t("confirmText")}
        confirmTitle={t("confirmTitle")}
        handleConfirm={handleDeleteItem}
      />
    </>
  );
};

export default Item;
