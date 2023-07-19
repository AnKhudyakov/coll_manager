import {
  useGetItemsByCollectionQuery,
  useGetItemsQuery,
} from "@/app/services/item";
import { selectIsUpdateItems } from "@/features/collection/collectionSlice";
import Item from "@/features/item/Item";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ItemsList = ({ collectionId, variant }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const isUpdateItems = useSelector(selectIsUpdateItems);
  const {
    data: items,
    isLoading,
    refetch,
  } = variant === "lastItems"
    ? useGetItemsQuery({ limit: 5, sort_by: "createdAt", sort_order: "desc" })
    : useGetItemsByCollectionQuery(collectionId);
  useEffect(() => {
    refetch();
  }, [isUpdateItems]);
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
            <>
              {items?.map((item) => (
                <Item item={item} key={item._id} variant={variant} />
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default ItemsList;
