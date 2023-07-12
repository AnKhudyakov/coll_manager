import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@mui/material";
import { FieldArray, FormikProvider, getIn } from "formik";
import "react-toastify/dist/ReactToastify.css";

const CustomFieldsItemForm = ({ formik, collection }) => {
  return (
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
                        {customField.type === "date" && (
                          <InputLabel>{customField.name}</InputLabel>
                        )}
                        <TextField
                          sx={{ mt: 2 }}
                          multiline={customField.type === "textarea"}
                          type={
                            customField.type === "textarea"
                              ? "text"
                              : customField.type
                          }
                          label={
                            customField.type !== "date" ? customField.name : ""
                          }
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
  );
};

export default CustomFieldsItemForm;
