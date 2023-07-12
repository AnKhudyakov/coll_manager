import { selectCurrentUser } from "@/features/auth/authSlice";
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  Avatar,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginForm from "./login/LoginForm";
import RegForm from "./registration/RegForm";
import Copyright from "@/components/Copyright";
import RecoverForm from "./recover/RecoverForm";

const AuthPage = ({ variant }) => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const title =
    variant === "login"
      ? t("signIn")
      : variant === "register"
      ? t("register")
      : t("recoverTitle");
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/profile/${user._id}`);
    }
  }, [user]);
  return (
    <Grid
      container
      component="main"
      bgcolor="background.light"
      minHeight="100vh"
      mt={"60px"}
    >
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3" color="text.secondary">
            {title}
          </Typography>
          {variant === "login" ? (
            <LoginForm />
          ) : variant === "register" ? (
            <RegForm />
          ) : (
            <RecoverForm />
          )}
          <Copyright content={t("copyright")} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
