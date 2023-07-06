import { useFormik } from "formik";
import { schemaLogin } from "@/helpers/validationForm";
import { INIT_VALUES_LOGIN as initialValues } from "@/constants/fields";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { setToken } from "@/helpers/auth";
import { useDispatch } from "react-redux";
import { setCredentials } from "../authSlice";
import { useLoginMutation } from "@/app/services/auth";
import { useTranslation } from "react-i18next";

const FormLogin = () => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const handleFormSubmit = async (values, actions) => {
    try {
      const data = await login(values).unwrap();
      dispatch(setCredentials(data));
      setToken(data, navigate);
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
        sx={{ mt: 2 }}
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
        type="password"
        label={t("password")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        name="password"
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
      >
        {t("signIn")}
      </Button>
      <Typography color="text.secondary">
        {t("accountDontHave")}{" "}
        <Link
          to="/register"
          style={{
            color: "#4285f4",
            textDecoration: "underline",
          }}
        >
          {t("signUp")}
        </Link>
      </Typography>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
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
