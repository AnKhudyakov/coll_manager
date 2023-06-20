import "react-toastify/dist/ReactToastify.css";
import Collections from "@/features/collection/Collections";
import { Box, Button, Typography } from "@mui/material";
import { useGetTagsQuery } from "@/app/services/tag";

const HomePage = () => {
  const { data: tags, isLoading } = useGetTagsQuery();
  return (
    <section>
      <Box p={3} pt="70px">
        <Typography variant="h3">Largest</Typography>
        <Box m="20px 0">
          <Collections variant="largest" />
        </Box>
      </Box>
      {tags?.map((tag) => (
                <Button
                  sx={{ mx: 1 }}
                  key={tag._id}
                  onClick={() => navigate(`/search?text=${tag}`)}
                >
                  #{tag.content}
                </Button>
              ))}

    </section>
  );
};

export default HomePage;
