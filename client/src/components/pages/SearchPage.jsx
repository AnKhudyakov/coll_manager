import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "@/app/services/search";
import ItemCard from "@/features/item/ItemCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("text");
  const { data: results, isLoading } = query
    ? useSearchQuery(query)
    : { data: [] };

  return (
    <Box p={3} pt="80px" width="100%" minHeight="100vh" bgcolor="background.light">
      <Box maxWidth="1250px" mx="auto">
        <Typography color="text.secondary" variant="h3">Results for: {query}</Typography>
        <Typography color="text.secondary" variant="h4">Found: {results.length} item(s)</Typography>
        {results?.map((item) => (
          <Box m={2}>
            <ItemCard item={item} key={item._id} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SearchPage;
