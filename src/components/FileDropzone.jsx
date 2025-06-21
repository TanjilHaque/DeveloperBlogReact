import React from "react";
import { useDropzone } from "react-dropzone";

const FileDropzone = ({
  onDrop,
  accept = { "image/*": [] },
  maxFiles = 5,
  multiple = true,
  className = "",
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded p-4 text-center cursor-pointer bg-white ${className}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the files here...</p>
      ) : (
        <p className="text-gray-500">Drag & drop or click to select an image</p>
      )}
    </div>
  );
};

export default FileDropzone;