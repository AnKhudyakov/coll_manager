import {
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PAGE_404_URL } from "@/constants/imageUrl";

export default function ErrorPage() {
  const { t } = useTranslation("translation", { keyPrefix: "error" });
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:740px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        pt: "calc(60px + 2vh)",
        bgcolor: "background.light",
      }}
    >
      <Container maxWidth="100%">
        <Box color="text.primary">
          <CardMedia
            component="img"
            image={PAGE_404_URL}
            alt="404 image"
            sx={{ width: "100%", height: "50vh", objectFit: "contain" }}
          />
          <Box m={"0 auto"} mt={1} textAlign={"center"}>
            <Typography variant={isNonMobile ? "h2" : "h3"}>
              {t("notFoundTitle")}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {t("notFoundText")}
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                color: "text.secondary",
                bgcolor: "background.main",
              }}
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
