import { useFormik } from "formik";
import { schemaItem } from "@/helpers/validationForm";
import { INIT_VALUES_ITEM as initialValues } from "@/constants/fields";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Autocomplete, Box, Button, Chip, TextField } from "@mui/material";
import { getUserId } from "@/helpers/auth";
import { usePostItemMutation } from "@/app/services/item";

const ItemForm = ({ setOpenForm, collectionId }) => {
  const [postItem, { isLoading }] = usePostItemMutation();
  const tags = ["Car", "Wine", "Stock"];
  const handleFormSubmit = async (values, actions) => {
    try {
      const newItem = {
        ...values,
        author: getUserId(),
        collectionId,
        likes: [],
        customFields: [],
      };
      await postItem(newItem).unwrap();
      actions.resetForm();
      toast.success("Successful create new item");
      setOpenForm(false);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: schemaItem,
  });
  console.log(formik);
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
        includeInputInList
        name="tags"
        value={formik.values.tags}
        onChange={(event, value) => {
          formik.setFieldValue("tags", [...value]);
        }}
        options={tags}
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
        style={{ width: 500 }}
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

export default ItemForm;
