import { useSearchQuery } from "@/app/services/search";
import ItemCard from "@/features/item/ItemCard";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "search" });
  const [searchParams] = useSearchParams();
  const query = searchParams.get("text");
  const [results, setResults] = useState([]);
  const { data: currentResults, isLoading, error } = useSearchQuery(query);

  useEffect(() => {
    currentResults ? setResults(currentResults) : null;
  }, [currentResults]);
  return (
    <Box
      p={3}
      pt="80px"
      width="100%"
      minHeight="100vh"
      bgcolor="background.light"
    >
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          height="100vh"
          width="100%"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box maxWidth="1250px" mx="auto">
          <Typography color="text.secondary" variant="h3">
            {t("results")}: {query}
          </Typography>
          <Typography color="text.secondary" variant="h4">
            {t("found")}: {results ? results.length : 0} {t("items")}
          </Typography>
          {results?.map((item) => (
            <Box m={2} key={item._id}>
              <ItemCard item={item} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
