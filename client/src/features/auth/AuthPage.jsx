import LoginForm from "./login/LoginForm";
import RegForm from "./registration/RegForm";
import { Box, Typography } from "@mui/material";
import { selectCurrentUser, setCredentials } from "@/features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = ({ variant }) => {
  const title = variant === "login" ? "Login" : "Register";
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate(`/profile/${user._id}`);
    }
  }, [user]);
  return (
    <section>
      <Box p={3} pt="70px" maxWidth="500px" m="0 auto">
        <Typography variant="h3">{title}</Typography>
        {variant === "login" ? <LoginForm /> : <RegForm />}
      </Box>
    </section>
  );
};

export default AuthPage;
