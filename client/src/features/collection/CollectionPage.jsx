import { useGetCollectionByIdQuery } from "@/app/services/collection";
import { useParams } from "react-router";
import CollectionCard from "@/components/CollectionCard";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Items from "../item/Items";
import ItemForm from "../item/ItemForm";
import { getUserId } from "@/helpers/auth";

const CollectionPage = () => {
  const [collection, setCollection] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const { id } = useParams();
  const { data: CurrentCollection, isLoading } = useGetCollectionByIdQuery(id);
  const userId = getUserId();
  useEffect(() => {
    if (CurrentCollection) {
      setCollection(CurrentCollection);
    }
  }, [CurrentCollection]);
  return (
    <Box
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <CollectionCard collection={collection} />
      <Items collectionId={collection?._id} />
      {collection?.author === userId && (
        <Box mt={2}>
          {openForm ? (
            <ItemForm setOpenForm={setOpenForm} collectionId={id} />
          ) : (
            <Button onClick={() => setOpenForm(true)}>Add new</Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default CollectionPage;
