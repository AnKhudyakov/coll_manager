import { Box, Typography } from "@mui/material";
import { useGetItemsByCollectionQuery } from "@/app/services/item";
import CollectionCard from "@/components/CollectionCard";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";

const Items = ({ collectionId }) => {
 // const [items, setItems] = useState([]);
  //const user = useSelector(selectCurrentUser);
  const { data: items, isLoading } = useGetItemsByCollectionQuery(collectionId)

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      {!items?.length ? (
        <Typography variant="h4">Items not found.</Typography>
      ) : (
        <></>
      )}
      {items?.map((item) => (
        <ItemCard item={item} key={item._id} />
      ))}
    </Box>
  );
};

export default Items;
