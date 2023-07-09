import {
  useGetItemsByCollectionQuery,
  useGetItemsQuery,
} from "@/app/services/item";
import Item from "@/features/item/Item";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";

const ItemsList = ({ collectionId, variant }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
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
            <Typography variant="h4" color="text.secondary">
              {t("notFound")}
            </Typography>
          ) : (
            <></>
          )}
          {items?.map((item) => (
            <Item item={item} key={item._id} variant="lastItem" />
          ))}
        </>
      )}
    </Box>
  );
};

export default ItemsList;
