import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("text")
  return (
    <Box
      pt="60px"
      width="100%"
      height="100%"
      backgroundColor="rgba(255, 255, 255, 1)"
    >
      <Typography >
      Search Results
      </Typography>
      Results for:{query}
    </Box>
  );
};

export default SearchPage;
