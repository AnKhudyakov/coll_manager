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

export const getExistValuesItem = (item) => {
  return {
    name: item.name,
    tags: item.tags.map((tag) => tag.content),
    customFields: item.customFields,
  }
}

export const getExistValuesCollection = (collection) => {
  return {
    name: collection.name,
    description: collection.description,
    topic: collection.topic,
    customFields: collection.customFields.map((customField) => ({
      ...customField,
      isDisabledType: true,
    })),
  }
}