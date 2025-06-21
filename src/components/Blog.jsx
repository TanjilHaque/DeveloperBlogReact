import React, { useEffect, useState } from "react";
import FileDropzone from "./FileDropzone";
import { get, getDatabase, ref, set, push } from "firebase/database";
import { auth } from "../../Database/firebase.config";
import _ from "../lib/lib";

const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_API;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;

const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [imageURL, setImageURL] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getDatabase();

  useEffect(() => {
    const fetchLastImage = async () => {
      try {
        const snapshot = await get(ref(db, "lastUploadedImage"));
        if (snapshot.exists()) {
          const savedURL = snapshot.val();
          if (savedURL) {
            setImageURL(savedURL);
          }
        }
      } catch (err) {
        console.error("Error fetching image from Firebase:", err);
      }
    };
    fetchLastImage();
  }, []);
  const handleDrop = (acceptedFiles) => {
    if (!loading && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(cloudinaryURL, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.secure_url) {
        setImageURL(data.secure_url);
        setFile(null);

        await push(ref(db, "users/profilePic"), {
          imageAddress: data.secure_url,
          uploadedAt: Date.now(),
        });

        await set(ref(db, "lastUploadedImage"), data.secure_url);
        alert("Image uploaded and saved to Firebase!");
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setImageURL("");
      setFile(null);
      await set(ref(db, "lastUploadedImage"), "");
      alert("Image removed.");
    } catch (err) {
      console.error("Error removing image:", err);
    }
  };

  const uploadBlog = () => {
    console.log("blog upload btn working");
    (set(ref(db, "users/uploadedBlog/userNo" + Date.now()), {
      title: title,
      description: description,
      image: imageURL,
      Profile_picture: file,
      createdAt: _.getTimeNow(),
    }))
  };
  return (
    <div className="w-[400px] min-h-[400px] border-2">
      <div>
        <div className="font-bold text-3xl">Post a blog</div>
        <hr />
        <div>
          <input
            className="border p-3 text-xl"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            placeholder="write title"
          />
        </div>
        <div>
          <div className="bg-amber-200">upload an image for the blog</div>
          <div className="flex flex-col justify-center items-center gap-6 p-4 bg-gray-50">
            <div className="imageBox w-[350px] h-[350px] rounded border-2 border-dashed flex items-center justify-center overflow-hidden bg-white">
              {loading ? (
                <p className="text-blue-500 animate-pulse text-lg">
                  Uploading...
                </p>
              ) : imageURL ? (
                <img
                  src={imageURL}
                  alt="Uploaded preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">Upload your blog picture</span>
              )}
            </div>

            {/* 📂 FileDropzone */}
            <FileDropzone
              onDrop={handleDrop}
              accept={{ "image/*": [] }}
              maxFiles={1}
              className={loading ? "pointer-events-none opacity-50" : ""}
            />

            {/* 🔘 Buttons */}
            <div className="flex gap-6">
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`px-6 py-2 rounded ${
                  file && !loading
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {loading ? "Uploading..." : "Upload Image"}
              </button>

              <button
                onClick={handleRemove}
                disabled={!imageURL || loading}
                className={`px-6 py-2 rounded ${
                  imageURL && !loading
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {loading ? "..." : "Remove Image"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>Write Description for your blog.</div>
        <input
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="write description...."
          className="p-4 w-full h-[100px] border-2 border-dotted"
        />
      </div>
      <button onClick={uploadBlog} className="p-4 rounded bg-amber-300">
        Submit blog.
      </button>
    </div>
  );
};

export default Blog;
