import React, { useEffect, useState } from "react";
import NavAdmin from "../NavAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axiosInstance from "../../../config/api";
import { useLocation, useNavigate } from "react-router-dom";

const AddKategori = () => {
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    const fileSizeLimit = 2 * 1024 * 1024; // 2 MB (ukuran maksimum yang diizinkan)

    if (selectedImage) {
      // Validasi ukuran file
      if (selectedImage.size > fileSizeLimit) {
        setErrorMessage(
          "Ukuran file terlalu besar. Silakan pilih file yang lebih kecil."
        );
        return;
      }

      // Validasi tipe file
      if (
        !["image/jpeg", "image/png", "image/jpg"].includes(selectedImage.type)
      ) {
        setErrorMessage(
          "Format file tidak didukung. Silakan pilih file gambar (JPG, PNG, atau JPEG)."
        );
        return;
      }

      // Tampilkan gambar
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setErrorMessage("");
      };
      reader.readAsDataURL(selectedImage);
      const files = [...event.target.files];
      files.forEach((value) => {
        if (value.size > 1000000)
          throw {
            message: `${value.name} Size Harus Dibawah 1MB`,
          };
        if (value.type.split("/")[0] !== "image") {
          throw {
            message: `${value.name} Harus Gambar`,
          };
        }
      });
      setImages(files);
    }
  };
  console.log(images);
  const handleRemoveImage = () => {
    setImages([]);
    setImage(null);
    setErrorMessage("");
    // Reset input file
    document.getElementById("file-upload").value = "";
  };
  const [inputProduct, setInputProduct] = useState("");
  const handleSubmit = async () => {
    try {
      console.log("ini submit");
      const data = {
        nama_kategori: inputProduct,
      };
      const fd = new FormData();
      fd.append("data", JSON.stringify(data));
      images.forEach((value) => {
        fd.append("images", value);
      });

      const res = await axiosInstance.post(`/kategori`, fd);

      setTimeout(() => {
        window.location.href = `/dashboard/kategori`;
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <NavAdmin />
      <div className="pembungkus m-5">
        <div className="flex m-auto border-blue-500 p-5 rounded-md flex-col md:w-[60%] border flex-wrap md:flex-nowrap gap-7">
          <div className="grid gap-1">
            <label htmlFor="">Nama Kategori</label>
            <input
              name="nama_product"
              onChange={(e) => setInputProduct(e.target.value)}
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Nama Product"
            />
          </div>

          <div>
            <label className="block text-sm font-medium ">Katgeori Image</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 "
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span className="">Upload a image</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      onChange={(e) => handleImageChange(e)}
                      // onChange={(e) => onSelectImages(e)}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 ">or drag and drop</p>
                </div>
                <p className="text-xs ">PNG, JPG, JPEG, up to 1MB</p>
              </div>
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {image && (
              <div className="mt-4">
                <img src={image} alt="Uploaded" className="max-w-full h-auto" />
                <button
                  onClick={handleRemoveImage}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus Gambar
                </button>
              </div>
            )}
          </div>
          <div className=" flex justify-end">
            <Button onClick={handleSubmit} color="primary" className="self-end">
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddKategori;
