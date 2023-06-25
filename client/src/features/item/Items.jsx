import {
  useGetItemsByCollectionQuery,
  useGetItemsQuery,
} from "@/app/services/item";
import ItemCard from "@/features/item/ItemCard";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Items = ({ collectionId, variant }) => {
  const { data: items, isLoading } =
    variant === "last"
      ? useGetItemsQuery({ limit: 5, sort_by: "createdAt", sort_order: "desc" })
      : useGetItemsByCollectionQuery(collectionId);
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1}>
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
          {!items?.length ? (
            <Typography variant="h4">Items not found.</Typography>
          ) : (
            <></>
          )}
          {items?.map((item) => (
            <ItemCard item={item} key={item._id} variant={variant} />
          ))}
        </>
      )}
    </Box>
  );
};

export default Items;
