import { useFormik } from "formik";
import { schemaItem } from "@/helpers/validationForm";
import { INIT_VALUES_ITEM as initialValues } from "@/constants/fields";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import { getUserId } from "@/helpers/auth";
import {
  usePostItemMutation,
  useUpdateItemMutation,
} from "@/app/services/item";

const ItemForm = ({ setOpenForm, collectionId, variant, name, tags }) => {
  const [postItem, { isLoading }] = usePostItemMutation();
  const [update, { isLoading: isUpdate }] = useUpdateItemMutation();
  const initTags = ["Car", "Wine", "Stock", "Snowboard"];
  const handleFormSubmit = async (values, actions) => {
    try {
      if (variant === "edit") {
        await update(values).unwrap();
      } else {
        const newItem = {
          ...values,
          author: getUserId(),
          collectionId,
          likes: [],
          customFields: [],
        };
        await postItem(newItem).unwrap();
      }
      actions.resetForm();
      toast.success("Successful create new item");
      setOpenForm(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  //TODO: add custom hook getExistValues
  const currentValues = variant === "edit" ? { name, tags } : initialValues;
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
        label={"Name"}
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
        options={initTags}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option}
              {...getTagProps({ index })}
              disabled={tags.indexOf(option) !== -1}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Add tag..." />
        )}
      />
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
          {(variant = "edit" ? "Update" : "Create")}
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
