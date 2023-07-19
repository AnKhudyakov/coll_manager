import { PAGE_ACTIVATION_URL } from "@/constants/imageUrl";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ActivationPage({ email }) {
  const { t } = useTranslation("translation", { keyPrefix: "activation" });
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:740px)");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        width: "100%",
        pt: "calc(60px + 1vh)",
        bgcolor: "background.light",
      }}
    >
      <Container maxWidth="100%">
        <Box color="text.primary">
          <CardMedia
            component="img"
            image={PAGE_ACTIVATION_URL}
            alt="404 image"
            sx={{ width: "100%", height: "30vh", objectFit: "contain" }}
          />
          <Box m={"0 auto"} mt={1} textAlign={"center"}>
            <Typography variant={isNonMobile ? "h2" : "h3"}>
              {t("notActivationTitle")}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {t("notActivationText")} {email}
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
