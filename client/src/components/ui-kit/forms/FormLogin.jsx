import { useFormik } from "formik";
import { schemaLogin } from "@/helpers/validationForm";
import { INIT_VALUES_LOGIN as initialValues } from "@/constants/fields";
import { Link, useNavigate } from "react-router-dom";
import { API } from "@/api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, TextField } from "@mui/material";

const FormLogin = () => {
  const navigate = useNavigate();
  const handleFormSubmit = async (values, actions) => {
    API.postLogin(values)
      .then((data) => {
        localStorage.setItem("access_token", data.token);
        actions.resetForm();
        toast.success("Successful Login");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            toast.error("Invalid email or password");
            break;
          default:
            toast.error(err.response.data.message);
        }
      });
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
      <Box>
        Do you have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#4285f4",
            textDecoration: "underline",
          }}
        >
          Sign up
        </Link>
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

export default FormLogin;
