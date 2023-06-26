import {
  useRemoveItemMutation,
  useUpdateItemMutation,
} from "@/app/services/item";
import { selectCurrentUser } from "@/features/auth/authSlice";
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
              {item?.name}
            </Typography>
            {item?.customFields.length ? (
              item?.customFields.map((field, index) => (
                <Box key={index}>
                  <Typography gutterBottom variant="h5" component="div">
                    {Object.keys(field)[0]}: {Object.values(field)[0]}
                  </Typography>
                </Box>
              ))
            ) : (
              <></>
            )}
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
          <Box display={"flex"}>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box justifySelf={"center"}>
              <Likes item={item} user={user} />
              {(item?.author === user?._id || user?.admin) && (
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
                    <IconButton aria-label="delete" onClick={handleDeleteItem}>
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
    </>
  );
};

export default Item;
