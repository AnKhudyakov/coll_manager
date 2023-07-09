import { useRemoveItemMutation } from "@/app/services/item";
import AlertDialog from "@/components/AlertDialog";
import { selectCurrentUser } from "@/features/auth/authSlice";
import Likes from "@/features/likes/Likes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, CardActionArea, Divider, IconButton } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

const Item = ({ item, variant }) => {
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
          {variant !== "collectionPage" ? (
            <CardActionArea onClick={() => navigate(`/items/${item._id}`)}>
              <ItemCard item={item} />
            </CardActionArea>
          ) : (
            <ItemCard item={item} />
          )}

          <Box display={"flex"}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box justifySelf={"center"}>
              <Likes item={item} user={user} />
              {(item?.author === user?._id || user?.admin) &&
                variant === "collectionPage" && (
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
                      <IconButton
                        aria-label="delete"
                        onClick={() => setOpen(true)}
                      >
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
