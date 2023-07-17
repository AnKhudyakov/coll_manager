import { INIT_VALUES_LOGIN as initialValues } from "@/constants/fields";
import { schemaRecover } from "@/helpers/validationForm";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecoverForm = () => {
  const { t } = useTranslation("translation", { keyPrefix: "auth" });
  const navigate = useNavigate();
  const handleFormSubmit = async (values, actions) => {
    try {
      actions.resetForm();
      toast.success(t("successRecover"));
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      toast.error(err);
    }
  };
  const handleCancel = () => {
    navigate("/login");
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaRecover,
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
      <Grid container gap={1}>
        <Grid item>
          <Button
            type="button"
            onClick={handleCancel}
            sx={{
              borderRadius: 0,
              minWidth: "100%",
              padding: "20px 40px",
              m: "20px 0",
              bgcolor: "background.main",
              color: "text.secondary",
            }}
          >
            {" "}
            {t("cancelBtn")}
          </Button>
        </Grid>
        <Grid item>
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
            {t("recoverBtn")}
          </Button>
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

export default RecoverForm;
