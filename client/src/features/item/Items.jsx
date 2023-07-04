import {
  useGetItemsByCollectionQuery,
  useGetItemsQuery,
} from "@/app/services/item";
import ItemCard from "@/features/item/ItemCard";
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
import ToolBar from "@/components/ToolBar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useItems } from "@/hooks/useItems";

const Items = ({ collectionId, variant, customFields }) => {
  const [items, setItems] = useState([]);
  const { data: currentItems, isLoading } =
    variant === "last"
      ? useGetItemsQuery({ limit: 5, sort_by: "createdAt", sort_order: "desc" })
      : useGetItemsByCollectionQuery(collectionId);
  useEffect(() => {
    if (!isLoading && currentItems.length) {
      setItems(currentItems);
    }
  }, [currentItems]);

  const [filter, setFilter] = useState({ query: "", sort: "", order: "" });

  const filteredAndSortedItems = useItems(
    items,
    filter.sort,
    filter.query,
    filter.order
  );

  return (
    <Box display="flex" flexDirection="column" gap={2} mt={1} p={5}>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>№</TableCell>
                  <TableCell>Name</TableCell>
                  {customFields?.map((field) => (
                    <TableCell
                      align={field.type !== "checkbox" ? "left" : "center"}
                      key={field.name}
                    >
                      {field.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAndSortedItems.length ? (
                  <>
                    {filteredAndSortedItems.map((item, index) => (
                      <TableRow
                        key={item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Link to={`/items/${item._id}`}>{item.name}</Link>
                        </TableCell>
                        {item?.customFields.map((field, index) => (
                          <TableCell
                            key={index}
                            align={
                              field.fieldType !== "checkbox" ? "left" : "center"
                            }
                          >
                            <Box>
                              {field.fieldType !== "checkbox" ? (
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {/* {...Object.keys(field)[0]}:{" "} */}
                                  {Object.values(field)[0]}
                                </Typography>
                              ) : (
                                <>
                                  {Object.values(field)[0] ? (
                                    <CheckCircleOutlineIcon />
                                  ) : (
                                    <HighlightOffIcon />
                                  )}
                                </>
                              )}
                            </Box>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>Items not found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {/* <>
        {!items?.length ? (
          <Typography variant="h4">Items not found.</Typography>
        ) : (
          <></>
        )}
        {items?.map((item) => (
          <ItemCard item={item} key={item._id} variant={variant} />
        ))}
      </> */}
    </Box>
  );
};

export default Items;
