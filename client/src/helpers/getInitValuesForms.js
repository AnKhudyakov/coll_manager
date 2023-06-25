export const getInitValuesItem = (fields) => {
  const customFields = [];
  fields.forEach((field) => {
    customFields.push({ [field.name]: "", fieldType:field.type });
  });
  return { name: "", tags: [], customFields };
};
