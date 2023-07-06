import {
  Box,
  IconButton,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import { CUSTOM_FIELD, TYPE_CUSTOM_FIELD as options } from "@/constants/fields";
import { FieldArray, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";

const CustomFieldsForm = ({ formik }) => {
  const { t } = useTranslation("translation", { keyPrefix: "profile" });
  return (
    <FormikProvider value={formik}>
      <FieldArray
        name="customFields"
        render={({ insert, remove }) => {
          return (
            <>
              {formik.values.customFields.map((customField, index) => {
                return (
                  <Box
                    key={index}
                    display="flex"
                    gap={1}
                    alignItems={"center"}
                    sx={{ mt: 2 }}
                  >
                    <TextField
                      fullWidth
                      type="text"
                      label={t("fieldName")}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name={`customFields.${index}.name`}
                      value={formik.values.customFields[index].name}
                      //   error={Boolean(
                      //     formik.touched.custom_name && formik.errors.custom_name
                      //   )}
                      //   helperText={
                      //     formik.touched.custom_name && formik.errors.custom_name
                      //   }
                    />
                    <FormControl fullWidth>
                      <InputLabel>{t("fieldType")}</InputLabel>
                      <Select
                        name={`customFields.${index}.type`}
                        value={formik.values.customFields[index].type}
                        label={t("fieldType")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      >
                        {options.map((option) => (
                          <MenuItem key={option.name} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Box>
                      <IconButton
                        aria-label="add custom field"
                        onClick={() => remove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                );
              })}
              <Box display="flex" alignItems="center" my={1}>
                <Typography variant="h4" color="text.secondary">
                  {t("addCustomField")}
                </Typography>
                <IconButton
                  aria-label="add custom field"
                  onClick={() =>
                    insert(formik.values.customFields.length + 1, CUSTOM_FIELD)
                  }
                >
                  <PostAddIcon />
                </IconButton>
              </Box>
            </>
          );
        }}
      />
    </FormikProvider>
  );
};

export default CustomFieldsForm;
