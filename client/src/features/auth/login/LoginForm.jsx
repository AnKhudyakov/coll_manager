import { useLoginMutation } from "@/app/services/auth";
import { INIT_VALUES_LOGIN as initialValues } from "@/constants/fields";
import { setToken } from "@/helpers/auth";
import { schemaLogin } from "@/helpers/validationForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setCredentials } from "../authSlice";
import { useState } from "react";

const FormLogin = () => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const handleFormSubmit = async (values, actions) => {
    try {
      const data = await login(values).unwrap();
      navigate(`/profile/${data.user._id}`);
      dispatch(setCredentials(data));
      setToken(data);
      actions.resetForm();
      toast.success(t("successSignIn"));
    } catch (err) {
      switch (err.status) {
        case 400:
          toast.error(t("error400"));
          break;
        case 404:
          toast.error(t("error404"));
          break;
        case 405:
          toast.error(t("error405"));
          break;
        default:
          toast.error(err.data.message);
          break;
      }
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaLogin,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={(theme) => ({
          mt: 2,
          "& .MuiOutlinedInput-input:-webkit-autofill": {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.main} inset`,
          },
        })}
        fullWidth
        type="text"
        label={t("email")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
        name="email"
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type={showPassword ? "text" : "password"}
        label={t("password")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(formik.touched.password && formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button
        type="submit"
        sx={{
          borderRadius: 0,
          minWidth: "100%",
          padding: "20px 40px",
          m: "20px 0",
          bgcolor: "background.main",
          color: "text.secondary",
        }}
        disabled={isLoading}
      >
        {t("signIn")}
        {isLoading && <CircularProgress sx={{ ml: 1 }} size={20} />}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to="/forgot" variant="body2">
            {t("forgotPassword")}
          </Link>
        </Grid>
        <Grid item>
          <Typography color="text.secondary">
            {t("accountDontHave")}{" "}
            <Link to="/register" variant="body2">
              {t("signUp")}
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
};

export default FormLogin;
