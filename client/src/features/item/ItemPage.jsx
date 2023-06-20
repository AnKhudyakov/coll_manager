import { useGetItemByIdQuery } from "@/app/services/item";
import { useParams } from "react-router";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Item from "./Item";

const ItemPage = () => {
  const { id } = useParams();
  const { data: item, isLoading } = useGetItemByIdQuery(id);
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
