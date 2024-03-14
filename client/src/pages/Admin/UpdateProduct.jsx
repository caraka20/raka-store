import React, { useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import axiosInstance from "../../config/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { product_id } = useParams();
  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const files = [...event.target.files];
    files.forEach((value) => {
      if (value.size > 1000000)
        throw {
          message: `${value.name} Size Harus Dibawah 1MB`,
        };
    });
    setFiles(files);
    if (file) {
      setFileName(file.name);
      event.target.value = null;
    } else {
      setFileName("");
    }
  };
  console.log(files);

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
  const handleRemoveImage = () => {
    setImages([]);
    setImage(null);
    setErrorMessage("");
    // Reset input file
    document.getElementById("file-upload").value = "";
  };
  const [inputHarga, setInputHarga] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  console.log(inputProduct);
  console.log(inputDescription);
  const formatCurrency = (value) => {
    if (isNaN(value)) return "";
    const formattedValue = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(value);

    return formattedValue;
  };

  // useEffect(() => {
  //   const unformattedValue = parseFloat(inputHarga.replace(/[^\d]/g, ""));
  //   const formattedValue = formatCurrency(unformattedValue);
  //   setInputHarga(formattedValue);
  // }, [inputHarga]);

  const handleInputHarga = (event) => {
    const inputHarga = event.target.value;
    setInputHarga(inputHarga);
  };
  console.log(inputHarga);

  const [dataKategori, setDataKategori] = useState(null);
  const param = useLocation();
  const [dataProduct, setDataProduct] = useState({});
  const [dataInputKategori, setDataInputKategori] = useState(null);
  console.log(dataInputKategori);
  let lala = "Tidak ada";
  if (dataKategori && dataInputKategori !== null && dataKategori.length > 0) {
    const selectedCategory = dataKategori.find(
      (kategori) => kategori.id === dataInputKategori
    );
    if (selectedCategory) {
      lala = selectedCategory.nama_kategori;
    }
  }

  const getDataKategori = async () => {
    try {
      const res = await axiosInstance.get("/kategori");
      const respon = await axiosInstance.get(`/product/${product_id}`);
      setDataProduct(respon.data.data);
      setDataInputKategori(respon.data.data.kategori_id);
      setInputProduct(respon.data.data.nama_product);
      setInputHarga(respon.data.data.harga);
      setInputDescription(respon.data.data.description);
      setDataKategori(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleKategori = (e) => {
    setDataInputKategori(e.target.value);
  };
  const handleSubmit = async () => {
    try {
      const data = {
        nama_product: inputProduct,
        kategori_id: dataInputKategori,
        harga: inputHarga,
        description: inputDescription,
      };

      const res = await axiosInstance.put(`/product/${product_id}`, data);
      alert("berhasil update product");
      setTimeout(() => {
        window.location.href = `/dashboard/product`;
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataKategori();
  }, []);
  return (
    <div className="w-full">
      <NavAdmin />
      <div className="pembungkus m-5">
        <div className="flex m-auto md:w-[60%] flex-col justify-start  items-start">
          <Select
            size={"sm"}
            onChange={handleKategori}
            name="products_categories_id"
            label="Pilih Kategori"
            className=" mb-5"
            value={lala}
          >
            {dataKategori?.map((kategori) => (
              <SelectItem key={kategori.id} value={kategori.id}>
                {kategori.nama_kategori}
              </SelectItem>
            ))}
          </Select>
          <div className="mb-[10px]">
            <span>Kategori dipilih</span> :{" "}
            <span className="text-sm font-semibold">{lala}</span>
          </div>
        </div>

        <div className="flex m-auto border-blue-500 p-5 rounded-md flex-col md:w-[60%] border flex-wrap md:flex-nowrap gap-7">
          <div className="grid gap-1">
            <label htmlFor="">Nama Product</label>
            <input
              name="nama_product"
              onChange={(e) => setInputProduct(e.target.value)}
              type="text"
              value={inputProduct}
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Nama Product"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="">Harga</label>
            <input
              type="text"
              value={inputHarga}
              onChange={handleInputHarga}
              placeholder="0.00"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="">Deskripsi</label>
            <ReactQuill
              theme="snow"
              value={inputDescription}
              name="description"
              className="h-[200px] mt-1"
              onChange={(e) => setInputDescription(e)}
            />
          </div>

          {/* <div className="mt-16">
            <label
              htmlFor="uploadFile"
              className="bg-blue-500 text-white rounded-md px-4 py-2 cursor-pointer hover:bg-blue-600 whitespace-no-wrap"
            >
              Pilih File
            </label>
            <input
              type="file"
              id="uploadFile"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <Input
              type="text"
              value={fileName}
              placeholder="File Yang Diuploud"
              className="mt-2"
            />
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium ">Product Image</label>
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
          </div> */}
          <div className=" flex justify-end">
            <Button
              onClick={handleSubmit}
              color="primary"
              className="self-end mt-7"
            >
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
