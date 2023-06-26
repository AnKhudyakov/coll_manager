import { useGetItemByIdQuery } from "@/app/services/item";
import { useParams } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Item from "./Item";
import Comments from "@/features/comment/Comments";
import CircularProgress from "@mui/material/CircularProgress";

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
          <Item item={item} />
          <Box p={2}>
            <Typography>Comments: </Typography>
            <Comments item={item} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ItemPage;
