import { useGetItemByIdQuery } from "@/app/services/item";
import Comments from "@/features/comment/Comments";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import Item from "./Item";

const ItemPage = () => {
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  const { id } = useParams();
  const { data: item, isLoading } = useGetItemByIdQuery(id);
  return (
    <Box
      p={3}
      pt="60px"
      width="100%"
      minHeight="100vh"
      bgcolor="background.light"
    >
      <Box maxWidth="1250px" m={"0 auto"}>
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
            <Item item={item} variant="itemPage" />
            <Box>
              <Typography color="text.primary" mt={1} variant="h3">
                {t("comments")}:
              </Typography>
              <Comments item={item} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ItemPage;
