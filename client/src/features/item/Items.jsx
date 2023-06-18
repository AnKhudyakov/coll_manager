import { Box, Typography } from "@mui/material";
import { useGetItemsByCollectionQuery } from "@/app/services/item";
import CollectionCard from "@/components/CollectionCard";
import { useEffect, useState } from "react";
import ItemCard from "@/components/ItemCard";

const Items = ({ collectionId }) => {
  const [items, setItems] = useState([]);
  const { data: CurrenItems, isLoading } =
    useGetItemsByCollectionQuery(collectionId);
  useEffect(() => {
    if (CurrenItems) {
      setItems(CurrenItems);
    }
  }, [CurrenItems]);
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
      {items.map((item) => (
        <ItemCard item={item} key={item._id} />
      ))}
    </Box>
  );
};

export default Items;
