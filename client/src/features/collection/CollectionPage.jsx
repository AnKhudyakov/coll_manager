import { useGetCollectionByIdQuery } from "@/app/services/collection";
import { useParams } from "react-router";
import CollectionCard from "@/components/CollectionCard";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Items from "../item/Items";
import ItemForm from "../item/ItemForm";
import { getUserId } from "@/helpers/auth";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";

const CollectionPage = () => {
  // const [collection, setCollection] = useState(null);
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
        <Typography variant="h1">Loading...</Typography>
      ) : (
        <>
          <CollectionCard collection={collection} />
          <Typography variant="h3" mt={2}>
            Items:
          </Typography>
          <Items collectionId={collection?._id} />
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
