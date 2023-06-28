import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "@/app/services/search";
import ItemCard from "@/features/item/ItemCard";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("text");
  const { data: results, isLoading } =query?useSearchQuery(query):{data:[]};
  
  return (
    <Box
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <Typography>Search Results</Typography>
      <Typography>Results for:{query}</Typography>
{results?.map((item)=><ItemCard item={item} key={item._id} />)}
    </Box>
  );
};

export default SearchPage;
