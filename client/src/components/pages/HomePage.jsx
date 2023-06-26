import "react-toastify/dist/ReactToastify.css";
import Collections from "@/features/collection/Collections";
import { Box, Button, Typography } from "@mui/material";
import { useGetTagsQuery } from "@/app/services/tag";
import { useNavigate } from "react-router-dom";
import Items from "@/features/item/Items";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetCollectionsQuery } from "@/app/services/collection";

const HomePage = () => {
  const { data: tags, isLoading: isLoadingTags } = useGetTagsQuery();
  const { data: collections, isLoading } = useGetCollectionsQuery({
    limit: 5,
    sort_by: "items",
    sort_order: "desc",
  });
  const navigate = useNavigate();
  return (
    <section>
      <Box p={3} pt="70px" maxWidth="1250px" mx="auto">
        <Box>
          <Typography variant="h3">Last items</Typography>
          <Items variant="last" />
        </Box>
        <Box mt={3}>
          <Typography variant="h3">Largest collections</Typography>
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
            {tags?.map((tag) => (
              <Button
                sx={{ m: 1 }}
                key={tag._id}
                onClick={() => navigate(`/search?text=${tag}`)}
              >
                #{tag.content}
              </Button>
            ))}
          </>
        )}
      </Box>
    </section>
  );
};

export default HomePage;
