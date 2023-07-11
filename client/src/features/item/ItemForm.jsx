import { useGetCollectionByIdQuery } from "@/app/services/collection";
import {
  usePostItemMutation,
  useUpdateItemMutation,
} from "@/app/services/item";
import { useGetTagsQuery } from "@/app/services/tag";
import { getUserId } from "@/helpers/auth";
import { getInitValuesItem } from "@/helpers/getInitValuesForms";
import { schemaItem } from "@/helpers/validationForm";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import { FieldArray, FormikProvider, getIn, useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemForm = ({ setOpenForm, collectionId, variant, item }) => {
  const { t } = useTranslation("translation", { keyPrefix: "collection" });
  const [postItem, { isLoading }] = usePostItemMutation();
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
  const { data: initTags, isLoading: isLoadingTags } = useGetTagsQuery();
  const { data: collection, isLoading: isLoadingCollection } =
    useGetCollectionByIdQuery(collectionId);
  const handleFormSubmit = async (values, actions) => {
    try {
      if (variant === "edit") {
        await updateItem({ id: item._id, ...values }).unwrap();
      } else {
        const newItem = {
          ...values,
          author: getUserId(),
          collectionId,
        };
        await postItem(newItem).unwrap();
      }
      actions.resetForm();
      toast.success(t("success"));
      setOpenForm(false);
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  //TODO: add custom hook getExistValues
  const currentValues =
    variant === "edit"
      ? { name: item.name, tags: item.tags.map((tag)=>tag.content), customFields: item.customFields }
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
        sx={{ mt: 2 }}
        multiple
        freeSolo
        fullWidth
        includeInputInList
        name="tags"
        value={formik.values.tags}
        onChange={(event, value) => {
          formik.setFieldValue("tags", [...value]);
        }}
        options={initTags ? initTags.map((tag) => tag.content) : []}
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
          <TextField {...params} label={t("tags")} placeholder="Add tag..." />
        )}
      />
      <FormikProvider value={formik}>
        <FieldArray
          name="customFields"
          render={({ insert, remove }) => {
            return (
              <>
                {collection?.customFields.map((customField, index) => {
                  return (
                    <Box
                      key={index}
                      display="flex"
                      gap={1}
                      alignItems={"center"}
                      sx={{ mt: 2 }}
                    >
                      {customField.type === "checkbox" ? (
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={
                                formik.values.customFields[index][
                                  customField.name
                                ]
                              }
                              onChange={formik.handleChange}
                              name={`customFields.${index}.${customField.name}`}
                            />
                          }
                          label={`${customField.name}`}
                        />
                      ) : (
                        <FormControl fullWidth>
                        {customField.type === "date"&&<InputLabel>{customField.name}</InputLabel>}
                        <TextField
                          sx={{ mt: 2 }}
                          multiline={customField.type === "textarea"}
                          type={
                            customField.type === "textarea"
                              ? "text"
                              : customField.type
                          }
                          label={customField.type !== "date"?customField.name:""}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={
                            formik.values.customFields.length
                              ? formik.values.customFields[index][
                                  customField.name
                                ]
                              : ""
                          }
                          name={`customFields.${index}.${customField.name}`}
                          error={Boolean(
                            getIn(formik.touched, customField.name) &&
                              getIn(formik.errors, customField.name)
                          )}
                          helperText={
                            getIn(formik.touched, customField.name) &&
                            getIn(formik.errors, customField.name)
                          }
                        />
                        </FormControl>
                      )}
                    </Box>
                  );
                })}
              </>
            );
          }}
        />
      </FormikProvider>
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

export default ItemForm;
