import { useGetItemsByCollectionQuery } from "@/app/services/item";
import ItemCard from "@/components/ItemCard";
import { Box, Typography } from "@mui/material";

const Items = ({ collectionId }) => {
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
