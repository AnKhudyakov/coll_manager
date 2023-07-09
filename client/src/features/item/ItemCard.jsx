import { Box, Button, CardContent, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  console.log("item", item);
  return (
    <CardContent>
      <Typography gutterBottom variant="h3" component="div">
        {item.name}
      </Typography>
      {item.customFields.length ? (
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
      <Box>
        <Typography gutterBottom variant="h5" component="div">
          {t("tags")}:
        </Typography>
        {item?.tags?.map((tag) => (
          <Button
            sx={{
              mx: 1,
              p: 1,
              bgcolor: "background.main",
              color: "text.secondary",
            }}
            key={tag}
            onClick={() => navigate(`/search?text=${tag}`)}
          >
            #{tag}
          </Button>
        ))}
      </Box>
    </CardContent>
  );
};

export default ItemCard;
