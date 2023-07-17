import { CUSTOM_FIELD, TYPE_CUSTOM_FIELD as options } from "@/constants/fields";
import DeleteIcon from "@mui/icons-material/Delete";
import PostAddIcon from "@mui/icons-material/PostAdd";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FieldArray, FormikProvider } from "formik";
import { useTranslation } from "react-i18next";

const CustomFieldsCollectionForm = ({ formik }) => {
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
                  <Box key={index} display="flex" gap={1} sx={{ mt: 2 }}>
                    <TextField
                      fullWidth
                      type="text"
                      label={t("fieldName")}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name={`customFields.${index}.name`}
                      value={formik.values.customFields[index].name}
                      error={Boolean(
                        formik.errors?.customFields?.[index]?.name &&
                          formik.touched?.customFields?.[index]?.name
                      )}
                      helperText={
                        formik.touched?.customFields?.[index]?.name &&
                        formik.errors?.customFields?.[index]?.name
                      }
                    />
                    <FormControl fullWidth>
                      <InputLabel>{t("fieldType")}</InputLabel>
                      <Select
                        name={`customFields.${index}.type`}
                        value={formik.values.customFields[index].type}
                        label={t("fieldType")}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={Boolean(
                          formik.errors?.customFields?.[index]?.type &&
                            formik.touched?.customFields?.[index]?.type
                        )}
                        disabled={
                          formik.values.customFields[index].isDisabledType
                            ? !formik.values.customFields[index].isCanUpdateType
                            : false
                        }
                      >
                        {options.map((option) => (
                          <MenuItem key={option.name} value={option.value}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {formik.touched?.customFields?.[index]?.type &&
                        formik.errors?.customFields?.[index]?.type && (
                          <Typography
                            color={"text.error"}
                            mt={"3px"}
                            fontSize={"10px"}
                          >
                            {formik.errors?.customFields?.[index]?.type}
                          </Typography>
                        )}
                    </FormControl>
                    <Box mt={1}>
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
              <Box display="flex" alignItems="center" mt={3}>
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

export default CustomFieldsCollectionForm;
