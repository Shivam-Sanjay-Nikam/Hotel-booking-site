import React, { useState } from "react";
import axios from "axios";

export default function PhotosUploader({ addedPhotos, setAddedPhotos }) {
  const [photoLink, setPhotoLink] = useState("");

  async function uploadPhoto(ev) {
    try {
      const files = ev.target.files;
      console.log(files[0])
      const formData = new FormData();
      formData.append("file", files[0]); // Assuming you want to upload the first file

      const response = await axios.post("http://localhost:3000/api/upload/uploadpics", formData);

      const { img } = response.data; // Assuming the image URL is in the "data" property

      setAddedPhotos((prev) => [...prev, img]);
      ev.target.value = ""; // Clear the file input
    } catch (error) {
      console.error("Error uploading photo:", error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div key={link} className="mb-4 md:mb-0">
              <img src={link} alt={link} className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-md" />
            </div>
          ))}
      </div>

      <label className="mt-4 md:mt-0 md:ml-4 h-10 w-full md:w-auto cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-black">
        <input type="file" name="image" className="hidden" onChange={uploadPhoto} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
      </label>
    </div>
  );
}
