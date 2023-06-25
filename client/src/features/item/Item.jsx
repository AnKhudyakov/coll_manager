import { useRemoveItemMutation, useUpdateItemMutation } from "@/app/services/item";
import { selectCurrentUser } from "@/features/auth/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemForm from "./ItemForm";
import Likes from "@/features/likes/Likes";

const Item = ({ item }) => {
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const user = useSelector(selectCurrentUser);
  const [removeItem, { isLoading }] = useRemoveItemMutation();
  const handleDeleteItem = () => {
    removeItem(item._id);
    navigate("/profile");
  };
console.log(item);
  return (
    <>
      <Card>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h3" component="div">
              {item?.name}
            </Typography>
            <Likes item={item} user={user} />
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                Tags:
              </Typography>
              {item?.tags?.map((tag) => (
                <Button
                  sx={{ mx: 1 }}
                  key={tag}
                  onClick={() => navigate(`/search?text=${tag}`)}
                >
                  #{tag}
                </Button>
              ))}
            </Box>
          </CardContent>
          {(item?.author === user?._id || user?.admin) && (
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
      <Box p={2}>
        <Typography>Comments</Typography>
      </Box>
    </>
  );
};

export default Item;
