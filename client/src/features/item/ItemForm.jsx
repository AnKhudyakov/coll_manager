import { useGetCollectionByIdQuery } from "@/app/services/collection";
import {
  usePostItemMutation,
  useUpdateItemMutation,
} from "@/app/services/item";
import { useGetTagsQuery } from "@/app/services/tag";
import { getUserId } from "@/helpers/auth";
import { createItem } from "@/helpers/createPostValue";
import {
  getExistValuesItem,
  getInitValuesItem,
} from "@/helpers/getInitValuesForms";
import { schemaItem } from "@/helpers/validationForm";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomFieldsItemForm from "../customFields/CustomFieldsItemForm";

const ItemForm = ({ setOpenForm, variant, item, collectionId }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const [postItem, { isLoading }] = usePostItemMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
  const { data: initTags, isLoading: isLoadingTags } = useGetTagsQuery({
    limit: 0,
    sort_by: "content",
    sort_order: "desc",
  });
  const { data: collection, isLoading: isLoadingCollection } =
    useGetCollectionByIdQuery(collectionId);
  const handleFormSubmit = async (values, actions) => {
    try {
      if (variant === "edit") {
        await updateItem({ id: item._id, ...values }).unwrap();
      } else {
        const author = getUserId();
        const newItem = createItem(author, values, collectionId);
        await postItem(newItem).unwrap();
      }
      actions.resetForm();
      toast.success(t("success"));
      setOpenForm(false);
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  const currentValues =
    variant === "edit"
      ? getExistValuesItem(item)
      : getInitValuesItem(collection.customFields);
  const formik = useFormik({
    initialValues: currentValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaItem,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mt: 2 }}
        fullWidth
        type="text"
        label={t("itemName")}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
        name="name"
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <Autocomplete
        name="tags"
        sx={{ mt: 2 }}
        multiple
        freeSolo
        fullWidth
        includeInputInList
        value={formik.values.tags}
        onBlur={formik.handleBlur("tags")}
        onChange={(event, value) => {
          formik.setFieldValue("tags", [...value]);
        }}
        options={initTags ? initTags.map((tag) => tag.content) : []}
        filterOptions={(options, { inputValue }) => {
          return options.filter((option) =>
            option.toLowerCase().startsWith(inputValue.toLowerCase())
          );
        }}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              disabled={initTags?.indexOf(option) !== -1}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={t("tags")}
            placeholder="Add tag..."
            error={Boolean(formik.touched.tags && formik.errors.tags)}
            helperText={formik.touched.tags && formik.errors.tags}
          />
        )}
      />
      <CustomFieldsItemForm formik={formik} collection={collection} />
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

export default ItemForm;
