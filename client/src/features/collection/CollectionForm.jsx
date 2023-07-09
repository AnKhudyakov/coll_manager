import {
  usePostCollectionMutation,
  useUpdateCollectionMutation,
} from "@/app/services/collection";
import { useUploadMutation } from "@/app/services/uplooadImage";
import CustomFieldsForm from "@/components/CustomFieldsForm";
import UploadFile from "@/components/UploadFile";
import {
  INIT_VALUES_COLLECTION,
  TOPIC_VALUES as options,
} from "@/constants/fields";
import { DEFAULT_IMAGE_URL } from "@/constants/imageUrl";
import { schemaCollection } from "@/helpers/validationForm";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkEditorWrapper from "@/styles/DarkEditorWrapper";

// const DarkEditorWrapper = styled("div")`
//   .w-md-editor {
//     box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.text.secondary};
//     background-color: ${({ theme }) => theme.palette.background.main};
//     color: ${({ theme }) => theme.palette.text.primary};
//   }
//   .w-md-editor-toolbar {
//     border-bottom: 1px solid ${({ theme }) => theme.palette.text.secondary};
//     background-color: ${({ theme }) => theme.palette.background.main};
//     color: ${({ theme }) => theme.palette.text.primary};
//     li {
//       button {
//         color: ${({ theme }) => theme.palette.text.primary};
//       }
//     }
//   }
//   .w-md-editor-header {
//     background-color: ${({ theme }) => theme.palette.background.main};
//     color: ${({ theme }) => theme.palette.text.primary};
//   }
//   .w-md-editor-preview {
//     box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.text.secondary};
//     background-color: ${({ theme }) => theme.palette.background.main};
//     color: ${({ theme }) => theme.palette.text.primary};
//   }
//   .wmde-markdown {
//     background-color: ${({ theme }) => theme.palette.background.light};
//     color: ${({ theme }) => theme.palette.text.primary};
//   }
// `;

const CollectionForm = ({ setOpenForm, variant, collection, author }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const currentValues =
    variant === "edit"
      ? {
          name: collection.name,
          description: collection.description,
          topic: collection.topic,
          customFields: collection.customFields.map((customField) => ({
            ...customField,
            isDisabledType: true,
          })),
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
            image: responseUpload
              ? responseUpload.secure_url
              : DEFAULT_IMAGE_URL,
          };
          await postCollection(newCollection).unwrap();
          break;
      }
      actions.resetForm();
      toast.success(t("success"));
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
      <Box mt={2}>
        <InputLabel sx={{ mb: 1 }}>{t("descCollection")}</InputLabel>
        <DarkEditorWrapper>
          <MDEditor
            aria-required
            value={formik.values.description}
            onChange={(value) => formik.handleChange("description")(value)}
            name="description"
            onBlurCapture={() =>
              formik.setTouched({ ...formik.touched, description: true })
            }
          />
        </DarkEditorWrapper>
        {formik.touched.description && formik.errors.description && (
          <Typography mt={1} variant="h5" color="secondary.main">
            {formik.errors.description}
          </Typography>
        )}
      </Box>
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>{t("topic")}</InputLabel>
        <Select
          name={`topic`}
          value={formik.values.topic}
          label={t("fieldType")}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.topic && formik.errors.topic)}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <UploadFile image={image} setImage={setImage} />
      <Box>
        <CustomFieldsForm formik={formik} variant={variant} />
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
            bgcolor: "background.main",
            color: "text.secondary",
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
