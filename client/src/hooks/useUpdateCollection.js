const useUpdateCollection = async (
  values,
  responseUpload,
  collection,
  updateCollection
) => {
  const updatedCollection = {
    ...values,
    image: responseUpload.secure_url,
  };
  await updateCollection({
    id: collection._id,
    ...updatedCollection,
  }).unwrap();
};

export default useUpdateCollection;
