import { useGetItemByIdQuery } from "@/app/services/item";
import { useParams } from "react-router";
import CollectionCard from "@/components/CollectionCard";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Items from "./Items";
import ItemCard from "@/components/ItemCard";
import Item from "@/components/Item";

const ItemPage = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const { data: CurrentItem, isLoading } = useGetItemByIdQuery(id);
  useEffect(() => {
    if (CurrentItem) {
      setItem(CurrentItem);
    }
  }, [CurrentItem]);
  return (
    <Box
    p={3}
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <Item item={item} />
    </Box>
  );
};

export default ItemPage;
