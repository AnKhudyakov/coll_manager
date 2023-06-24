export const getInitValuesItem = (fields) => {
  const customFields = [];
  fields.forEach((field) => {
    customFields.push({ [field.name]: "" });
  });
  return { name: "", tags: [], customFields };
};
