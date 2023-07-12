import { DEFAULT_IMAGE_URL } from "@/constants/imageUrl";

export const createComment = (author, itemId, content) => {
  return {
    event: "message",
    comment: {
      author,
      itemId,
      content,
    },
  };
};

export const createItem = (author, values, collectionId) => {
  return {
    ...values,
    author,
    collectionId,
  };
};

export const createCollection = (author, values, responseUpload) => {
  return {
    ...values,
    author,
    image: responseUpload ? responseUpload.secure_url : DEFAULT_IMAGE_URL,
  };
};
