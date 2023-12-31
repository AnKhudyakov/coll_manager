import {
  useGetItemsByCollectionQuery,
  useGetItemsQuery,
} from "@/app/services/item";
import ToolBar from "@/components/ToolBar";
import { selectIsUpdateItems } from "@/features/collection/collectionSlice";
import { useItems } from "@/hooks/useItems";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import ItemRow from "./ItemRow";

const Items = ({ collectionId, variant, customFields }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const isUpdateItems = useSelector(selectIsUpdateItems);
  const [items, setItems] = useState([]);
  const {
    data: currentItems,
    isLoading,
    refetch,
  } = variant === "last"
    ? useGetItemsQuery({ limit: 5, sort_by: "createdAt", sort_order: "desc" })
    : useGetItemsByCollectionQuery(collectionId);
  useEffect(() => {
    if (!isLoading && currentItems.length) {
      setItems(currentItems);
    }
  }, [currentItems]);

  useEffect(() => {
    refetch();
  }, [isUpdateItems]);

  const [filter, setFilter] = useState({ query: "", sort: "", order: "" });

  const filteredAndSortedItems = useItems(
    items,
    filter.sort,
    filter.query,
    filter.order
  );
  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1} p={2}>
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
          <ToolBar
            filter={filter}
            setFilter={setFilter}
            customFields={customFields}
          />
          {filteredAndSortedItems.length ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        width: "1%",
                      }}
                    >
                      №
                    </TableCell>
                    <TableCell
                      sx={{
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        backgroundColor: "background.default",
                        width: "10%",
                      }}
                    >
                      {t("itemName")}
                    </TableCell>
                    {customFields
                      ?.filter((field) => field.type !== "textarea")
                      .map((field) => (
                        <TableCell
                          sx={{
                            width: "20%",
                          }}
                          align={field.type !== "checkbox" ? "left" : "center"}
                          key={field.name}
                        >
                          {field.name}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAndSortedItems.map((item, index) => (
                    <ItemRow key={item._id} item={item} index={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="h3" textAlign={"center"} color="text.primary">
              {t("notFound")}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Items;
