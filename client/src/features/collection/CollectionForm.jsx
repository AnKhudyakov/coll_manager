import {
  usePostCollectionMutation,
  useUpdateCollectionMutation,
} from "@/app/services/collection";
import { useUploadMutation } from "@/app/services/uplooadImage";
import UploadFile from "@/components/UploadFile";
import {
  INIT_VALUES_COLLECTION,
  TOPIC_VALUES as options,
} from "@/constants/fields";
import CustomFieldsCollectionForm from "@/features/customFields/CustomFieldsCollectionForm";
import { createCollection } from "@/helpers/createPostValue";
import { getExistValuesCollection } from "@/helpers/getInitValuesForms";
import { schemaCollection } from "@/helpers/validationForm";
import useUpdateCollection from "@/hooks/useUpdateCollection";
import useUploadImage from "@/hooks/useUploadImage";
import DarkEditorWrapper from "@/styles/DarkEditorWrapper";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CollectionForm = ({ setOpenForm, variant, collection, author }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  const [image, setImage] = useState("");
  const [postCollection, { isLoading }] = usePostCollectionMutation();
  const [updateCollection, { isLoading: isUpdating }] =
    useUpdateCollectionMutation();
  const [upload, { isLoading: isUploading }] = useUploadMutation();
  const handleFormSubmit = async (values, actions) => {
    try {
      const responseUpload = image ? await useUploadImage(image, upload) : null;
      switch (variant) {
        case "edit":
          if (responseUpload) {
            await useUpdateCollection(
              values,
              responseUpload,
              collection,
              updateCollection
            );
          } else {
            await updateCollection({ id: collection._id, ...values }).unwrap();
          }
          break;
        case "new":
          const newCollection = createCollection(
            author,
            values,
            responseUpload
          );
          await postCollection(newCollection).unwrap();
          break;
      }
      actions.resetForm();
      toast.success(t("success"));
      setOpenForm(false);
    } catch (err) {
      toast.error(err);
    }
  };
  const currentValues =
    variant === "edit"
      ? getExistValuesCollection(collection)
      : INIT_VALUES_COLLECTION;
  const formik = useFormik({
    initialValues: currentValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaCollection,
  });
  return (
    <Box>
      {isLoading || isUpdating || isUploading ? (
        <Box
          display="flex"
          justifyContent="center"
          minHeight="100vh"
          alignItems="center"
          maxWidth="1250px"
        >
          <CircularProgress />
        </Box>
      ) : (
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
            <CustomFieldsCollectionForm formik={formik} />
          </Box>
          <Box display="flex" justifyContent="space-around">
            <Button
              type="button"
              sx={{
                borderRadius: 0,
                minWidth: "30%",
                padding: "10px 20px",
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
                padding: "5px 20px",
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
      )}
    </Box>
  );
};

export default CollectionForm;
