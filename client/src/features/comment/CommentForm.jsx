import { getUserId } from "@/helpers/auth";
import { schemaComment } from "@/helpers/validationForm";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { createComment } from "@/helpers/createPostValue";
import "react-toastify/dist/ReactToastify.css";

const CommentForm = ({ socket, itemId }) => {
  const { t } = useTranslation("translation", { keyPrefix: "item" });
  const handleFormSubmit = async (values, actions) => {
    try {
      const author = getUserId();
      const comment = createComment(author, itemId, values.comment);
      socket.send(JSON.stringify(comment));
      actions.resetForm();
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  const formik = useFormik({
    initialValues: { comment: "" },
    onSubmit: handleFormSubmit,
    validationSchema: schemaComment,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        multiline
        minRows={3}
        type="text-aria"
        label={t("commentInput")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.comment}
        name="comment"
        error={Boolean(formik.touched.comment && formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
      />
      <Box display="flex" justifyContent="space-around">
        <Button
          type="submit"
          sx={{
            borderRadius: 0,
            minWidth: "30%",
            padding: "10px 30px",
            m: "20px 0",
            bgcolor: "background.main",
            color: "text.secondary",
          }}
        >
          {t("commentBtn")}
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

export default CommentForm;
