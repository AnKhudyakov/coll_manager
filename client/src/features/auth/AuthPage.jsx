import LoginForm from "./login/LoginForm";
import RegForm from "./registration/RegForm";
import { Box, Typography } from "@mui/material";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const AuthPage = ({ variant }) => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const title = variant === "login" ? t("signIn") : t("register");
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/profile/${user._id}`);
    }
  }, [user]);
  return (
    <section>
      <Box bgcolor="background.light" minHeight="100vh">
        <Box p={3} pt="70px" maxWidth="500px" m="0 auto">
          <Typography variant="h3" color="text.secondary">
            {title}
          </Typography>
          {variant === "login" ? <LoginForm /> : <RegForm />}
        </Box>
      </Box>
    </section>
  );
};

export default AuthPage;
