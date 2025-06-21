// src/hooks/useCloudinaryUpload.js
import { useState } from "react";
import _ from "../lib/lib";

const cloudinaryApi = import.meta.env.VITE_CLOUDINARY_API;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const useCloudinaryUpload = () => {
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    setLoading(true);
    setError(null);
    setUploadedUrl(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(cloudinaryApi, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Cloudinary upload failed");

      const data = await res.json();
      setUploadedUrl(data.secure_url);
      _.SucessToast("Image uploaded successfully!");
      return data.secure_url;
    } catch (err) {
      setError(err.message);
      _.ErrorToast("Image upload failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
    uploadedUrl,
    error,
  };
};

export default useCloudinaryUpload;
