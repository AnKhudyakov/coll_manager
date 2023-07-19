import { Box, Button, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, variant }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  return (
    <CardContent>
      <Typography
        gutterBottom
        variant="h3"
        component="div"
        color="text.primary"
      >
        {item.name}
      </Typography>
      {variant !== "search" && (
        <>
          <Typography gutterBottom variant="h4" component="div">
            {t("collection")}: {item.collectionId.name}
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
            {t("author")}: {item.author.username}
          </Typography>
        </>
      )}
      {variant !== "lastItems" && item.customFields.length ? (
        item.customFields.map((field, index) => (
          <Box key={index}>
            {field.fieldType !== "checkbox" && (
              <Typography gutterBottom variant="h5">
                {Object.keys(field)[0]}: {Object.values(field)[0]}
              </Typography>
            )}
          </Box>
        ))
      ) : (
        <></>
      )}
      {variant === "itemPage" && (
        <Box>
          <Typography gutterBottom variant="h5" component="div">
            {t("tags")}:
          </Typography>
          {item.tags?.map((tag) => (
            <Button
              sx={{
                m: 1,
                p: 1,
                bgcolor: "background.main",
                color: "text.primary",
              }}
              key={tag._id}
              onClick={() => navigate(`/search?text=${tag.content}`)}
            >
              #{tag.content}
            </Button>
          ))}
        </Box>
      )}
    </CardContent>
  );
};

export default ItemCard;
