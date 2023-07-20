import { useRegMutation } from "@/app/services/auth";
import { INIT_VALUES_REG as initialValues } from "@/constants/fields";
import { getRegDto } from "@/helpers/auth";
import { schemaReg } from "@/helpers/validationForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormReg = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleClickShowConfirm = () => setShowConfirm(!showConfirm);
  const [reg, { isLoading }] = useRegMutation();
  const handleFormSubmit = async (values, actions) => {
    try {
      const regDto = getRegDto(values);
      await reg(regDto).unwrap();
      actions.resetForm();
      toast.success(t("successReg"));
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      switch (err.status) {
        case 401:
          toast.error(t("error401"));
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
    validationSchema: schemaReg,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type="text"
        label={t("name")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.username}
        name="username"
        error={Boolean(formik.touched.username && formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
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
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type={showConfirm ? "text" : "password"}
        label={t("confirmPassword")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        name="confirmPassword"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowConfirm}
              >
                {showConfirm ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(
          formik.touched.confirmPassword && formik.errors.confirmPassword
        )}
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
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
        {t("signUp")}
        {isLoading && <CircularProgress sx={{ ml: 1 }} size={20} />}
      </Button>
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

export default FormReg;
