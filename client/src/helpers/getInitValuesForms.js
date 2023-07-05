export const getInitValuesItem = (fields) => {
  const customFields = [];
  fields.forEach((field) => {
    if (field.type === "checkbox") {
      return customFields.push({ [field.name]: false, fieldType: field.type });
    }
    return customFields.push({ [field.name]: "", fieldType: field.type });
  });
  return { name: "", tags: [], customFields };
};
