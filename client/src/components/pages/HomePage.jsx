import { useGetCollectionsQuery } from "@/app/services/collection";
import { useGetTagsQuery } from "@/app/services/tag";
import Collections from "@/features/collection/Collections";
import ItemsList from "@/features/item/ItemsList";
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "home" });
  const { data: tags, isLoading: isLoadingTags, error: getTagError } = useGetTagsQuery();
  const { data: collections, isLoading, error } = useGetCollectionsQuery({
    limit: 5,
    sort_by: "items",
    sort_order: "desc",
  });
  const navigate = useNavigate();

  return (
    <section>
      <Box p={3} pt="70px" bgcolor="background.light" minHeight="100vh">
        <Box maxWidth="1250px" mx="auto">
          <Box>
            <Typography variant="h3" color="text.secondary">
              {t("lastItems")}
            </Typography>
            <ItemsList variant="last" />
          </Box>
          <Box mt={3}>
            <Typography variant="h3" color="text.secondary">
              {t("LargestCollections")}
            </Typography>
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
              <Box m="20px 0">
                <Collections collections={collections} />
              </Box>
            )}
          </Box>
          {isLoadingTags ? (
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
              <Typography variant="h3" color="text.secondary">
                {t("popularTags")}
              </Typography>
              {tags?.map((tag) => (
                <Button
                  sx={{
                    m: 1,
                    bgcolor: "background.main",
                    color: "text.secondary",
                  }}
                  key={tag._id}
                  onClick={() => navigate(`/search?text=${tag.content}`)}
                >
                  #{tag.content}
                </Button>
              ))}
            </>
          )}
        </Box>
      </Box>
    </section>
  );
};

export default HomePage;
