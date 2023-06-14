import FormLogin from "@/components/ui-kit/forms/FormLogin";
import FormReg from "@/components/ui-kit/forms/FormReg";
import { Box, Typography } from "@mui/material";

const AuthPage = ({ variant }) => {
  const title = variant === "login" ? "Login" : "Register";
  return (
    <section>
      <Box p={3} pt="70px" maxWidth="500px" m="0 auto">
        <Typography variant="h3">{title}</Typography>
        {variant === "login" ? <FormLogin /> : <FormReg />}
      </Box>
    </section>
  );
};

export default AuthPage;
