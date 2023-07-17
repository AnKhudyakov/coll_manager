import { useRegMutation } from "@/app/services/auth";
import { INIT_VALUES_REG as initialValues } from "@/constants/fields";
import { schemaReg } from "@/helpers/validationForm";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormReg = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const [reg, { isLoading }] = useRegMutation();
  const handleFormSubmit = async (values, actions) => {
    try {
      await reg(values).unwrap();
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
