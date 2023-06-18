import { useFormik } from "formik";
import { schemaCollection } from "@/helpers/validationForm";
import { INIT_VALUES_COLLECTION as initialValues } from "@/constants/fields";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { getUserId } from "@/helpers/auth";
import { usePostCollectionMutation } from "@/app/services/collection";
import { useState } from "react";
import { useUploadMutation } from "@/app/services/uplooadImage";

const CollectionForm = ({ setOpenForm }) => {
  const [image, setImage] = useState("");
  const [postCollection, { isLoading }] = usePostCollectionMutation();
  const [upload, { isLoading: isUploading }] = useUploadMutation();
  const ref = useRef(null);
  const handleFormSubmit = async (values, actions) => {
    try {
      let responseUpload;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "course");
        formData.append(
          "cloud_name",
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        );
        responseUpload = await upload(formData).unwrap();
      }
      const newCollection = {
        ...values,
        author: getUserId(),
        image: responseUpload ? responseUpload.secure_url : "",
        customFields: [],
      };
      await postCollection(newCollection).unwrap();
      actions.resetForm();
      toast.success("Successful create new collection");

      setOpenForm(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaCollection,
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
        value={formik.values.name}
        name="name"
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        multiline
        minRows={3}
        type="text-aria"
        label={"Description"}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.description}
        name="description"
        error={Boolean(formik.touched.description && formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type="text"
        label={"Topic"}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.topic}
        name="topic"
        error={Boolean(formik.touched.topic && formik.errors.topic)}
        helperText={formik.touched.topic && formik.errors.topic}
      />

      <Button
        component="label"
        variant="outlined"
        startIcon={<UploadFileIcon />}
        sx={{ marginRight: "1rem", mt: 2 }}
      >
        Upload Image
        <input
          type="file"
          accept="image/*"
          name="image"
          ref={ref}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button>

      {image && (
        <List
          sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={image.name}
              secondary={`size:${(image.size / 1024).toFixed(2)} Кб`}
            />
            <IconButton
              aria-label="delete"
              onClick={() => {
                setImage("");
                ref.current.value = null;
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        </List>
      )}
      <Box display="flex" justifyContent="space-around">
        <Button
          type="button"
          sx={{
            borderRadius: 0,
            minWidth: "30%",
            padding: "20px 40px",
            m: "20px 0",
          }}
          onClick={() => setOpenForm(false)}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          sx={{
            borderRadius: 0,
            minWidth: "30%",
            padding: "20px 40px",
            m: "20px 0",
          }}
        >
          Create
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

export default CollectionForm;
