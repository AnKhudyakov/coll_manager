import { Box, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "@/app/services/search";
import ItemCard from "@/features/item/ItemCard";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "search" });
  const [searchParams] = useSearchParams();
  const query = searchParams.get("text");
  const { data: results, isLoading } = query
    ? useSearchQuery(query)
    : { data: [] };

  return (
    <Box
      p={3}
      pt="80px"
      width="100%"
      minHeight="100vh"
      bgcolor="background.light"
    >
      <Box maxWidth="1250px" mx="auto">
        <Typography color="text.secondary" variant="h3">
          {t("results")}: {query}
        </Typography>
        <Typography color="text.secondary" variant="h4">
          {t("found")}: {results ? results.length : 0} {t("items")}
        </Typography>
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
