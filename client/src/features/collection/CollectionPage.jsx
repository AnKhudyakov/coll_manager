import { useGetCollectionByIdQuery } from "@/app/services/collection";
import { useParams } from "react-router";
import Collection from "./Collection";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Items from "../item/Items";
import ItemForm from "../item/ItemForm";
import { getUserId } from "@/helpers/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";

const CollectionPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const { id } = useParams();
  const { data: collection, isLoading } = useGetCollectionByIdQuery(id);
  const user = useSelector(selectCurrentUser);

  return (
    <Box pt="60px" width="100%" bgcolor="background.light" minHeight="100vh">
      <Box maxWidth="1250px" mx="auto">
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            height="100vh"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Collection collection={collection} variant="page" />
            <Typography variant="h3" mt={2} px={5} color="text.secondary">
              Items:
            </Typography>
            <Items collectionId={id} customFields={collection.customFields} />
            {(collection.author === user?._id || user?.admin) && (
              <Box mt={2} px={5}>
                {openForm ? (
                  <ItemForm setOpenForm={setOpenForm} collectionId={id} />
                ) : (
                  <Button
                    sx={{
                      p: 1,
                      bgcolor: "background.main",
                      color: "text.secondary",
                    }}
                    onClick={() => setOpenForm(true)}
                  >
                    Add new
                  </Button>
                )}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CollectionPage;
