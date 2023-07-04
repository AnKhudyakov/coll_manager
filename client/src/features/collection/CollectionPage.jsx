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
    <Box
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
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
        <>
          <Collection collection={collection} variant="page" />
          <Typography variant="h3" mt={2} px={5}>
            Items:
          </Typography>
          <Items collectionId={id} customFields={collection.customFields} />
          {(collection.author === user?._id || user?.admin) && (
            <Box mt={2}>
              {openForm ? (
                <ItemForm setOpenForm={setOpenForm} collectionId={id} />
              ) : (
                <Button onClick={() => setOpenForm(true)}>Add new</Button>
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default CollectionPage;
