import { schemaReg } from "@/helpers/validationForm";
import { useFormik } from "formik";
import { INIT_VALUES_REG as initialValues } from "@/constants/fields";
import { API } from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { Button, TextField } from "@mui/material";

const FormReg = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (values, actions) => {
    API.postReg(values)
      .then((data) => {
        actions.resetForm();
        toast.success("Successful registration");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            toast.error("Email and Password already exist");
            break;
          default:
            toast.error(err.response.data.message);
        }
      });
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
        label={"Name"}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.user_name}
        name="user_name"
        error={Boolean(formik.touched.user_name && formik.errors.user_name)}
        helperText={formik.touched.user_name && formik.errors.user_name}
      />
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type="text"
        label={"Email"}
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
        type="text"
        label={"Password"}
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
        }}
      >
        SIGN IN
      </Button>

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

export default FormReg;
