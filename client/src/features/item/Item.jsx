import { useRemoveItemMutation } from "@/app/services/item";
import AlertDialog from "@/components/AlertDialog";
import { selectCurrentUser } from "@/features/auth/authSlice";
import Likes from "@/features/likes/Likes";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemCard from "./ItemCard";
import ItemForm from "./ItemForm";

const Item = ({ item, variant }) => {
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:700px)");
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
          display="flex"
          alignItems="stretch"
          justifyContent="space-between"
          flexDirection={isNonMobile ? "row" : "column"}
        >
          {variant !== "collectionPage" ? (
            <CardActionArea onClick={() => navigate(`/items/${item._id}`)}>
              <ItemCard item={item} variant={variant} />
            </CardActionArea>
          ) : (
            <ItemCard item={item} variant={variant} />
          )}

          <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={isNonMobile ? "row" : "column"}>
            <Divider orientation={isNonMobile ? "vertical":"horizontal"} variant="middle" flexItem />
            <Box justifySelf={"center"} display={"flex"} flexDirection={!isNonMobile ? "row" : "column"}>
              <Likes item={item} user={user} />
              {(item?.author.username === user?._id || user?.admin) &&
                variant === "collectionPage" && (
                  <Box display={"flex"} >
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
