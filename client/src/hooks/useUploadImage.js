const useUploadImage = async (image, upload) => {
    const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "course");
        formData.append(
          "cloud_name",
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        );
        return await upload(formData).unwrap();
}

export default useUploadImage