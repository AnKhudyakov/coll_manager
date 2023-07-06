import { useFormik } from "formik";
import { schemaCollection } from "@/helpers/validationForm";
import { INIT_VALUES_COLLECTION } from "@/constants/fields";
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
  Typography,
} from "@mui/material";

import { getUserId } from "@/helpers/auth";
import {
  usePostCollectionMutation,
  useUpdateCollectionMutation,
} from "@/app/services/collection";
import { useState } from "react";
import { useUploadMutation } from "@/app/services/uplooadImage";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CustomFieldsForm from "@/components/CustomFieldsForm";
import UploadFile from "@/components/UploadFile";
import { useTranslation } from "react-i18next";

const CollectionForm = ({ setOpenForm, variant, collection, author }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const currentValues =
    variant === "edit"
      ? {
          name: collection.name,
          description: collection.description,
          topic: collection.topic,
          customFields: [...collection.customFields],
        }
      : INIT_VALUES_COLLECTION;
  const [image, setImage] = useState("");
  const [postCollection, { isLoading }] = usePostCollectionMutation();
  const [updateCollection, { isLoading: isUpdating }] =
    useUpdateCollectionMutation();
  const [upload, { isLoading: isUploading }] = useUploadMutation();
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
      switch (variant) {
        case "edit":
          if (responseUpload) {
            const updatedCollection = {
              ...values,
              image: responseUpload.secure_url,
            };
            await updateCollection({
              id: collection._id,
              ...updatedCollection,
            }).unwrap();
          } else {
            await updateCollection({ id: collection._id, ...values }).unwrap();
          }
          break;
        case "new":
          const newCollection = {
            ...values,
            author,
            image: responseUpload ? responseUpload.secure_url : "",
          };
          await postCollection(newCollection).unwrap();
          break;
      }

      actions.resetForm();
      toast.success("Successful create new collection");
      setOpenForm(false);
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  const formik = useFormik({
    initialValues: currentValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaCollection,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type="text"
        label={t("nameCollection")}
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
        label={t("descCollection")}
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
        label={t("topic")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.topic}
        name="topic"
        error={Boolean(formik.touched.topic && formik.errors.topic)}
        helperText={formik.touched.topic && formik.errors.topic}
      />
      <UploadFile image={image} setImage={setImage} />
      <Box>
        <CustomFieldsForm formik={formik} />
      </Box>
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
          }}
        >
          {variant === "edit" ? t("updateBtn") : t("createBtn")}
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
