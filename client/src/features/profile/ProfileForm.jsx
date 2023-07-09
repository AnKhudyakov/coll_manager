import { useUpdateUserMutation } from "@/app/services/user";
import { schemaProfile } from "@/helpers/validationForm";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileForm = ({ username, setOpenForm, email, userId }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const dispatch = useDispatch();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const handleFormSubmit = async (values, actions) => {
    try {
      await updateUser({ id: userId, ...values }).unwrap();
      actions.resetForm();
      setOpenForm(false);
      toast.success(t("success"));
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
    initialValues: { username, email },
    onSubmit: handleFormSubmit,
    validationSchema: schemaProfile,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type="text"
        label={t("username")}
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
      <Box display="flex" justifyContent="space-around">
        <Button
          type="button"
          sx={{
            borderRadius: 0,
            minWidth: "30%",
            padding: "20px 40px",
            m: "20px 0",
            bgcolor: "background.main",
            color: "text.secondary",
          }}
          onClick={() => setOpenForm(false)}
        >
          {t("cancelBtn")}
        </Button>
        <Button
          type="submit"
          sx={{
            borderRadius: 0,
            minWidth: "30%",
            padding: "20px 40px",
            m: "20px 0",
            bgcolor: "background.main",
            color: "text.secondary",
          }}
        >
          {t("updateBtn")}
        </Button>
      </Box>
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

export default ProfileForm;