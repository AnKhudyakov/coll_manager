import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PAGE_404_URL } from "@/constants/imageUrl";

export default function ErrorPage() {
  const { t } = useTranslation("translation", { keyPrefix: "error" });
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Container maxWidth="100%">
        <Box >
          <CardMedia
            component="img"
            image={PAGE_404_URL}
            alt="404 image"
            sx={{ width: "100%", height: "50vh", objectFit: "contain" }}
          />
          <Box m={"0 auto"} textAlign={"center"}>
            <Typography variant="h2">{t("notFoundTitle")}</Typography>
            <Typography variant="h6">{t("notFoundText")}</Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate("/")}
            >
              {t("backHome")}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
