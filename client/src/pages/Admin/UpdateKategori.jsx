import React, { useState } from "react";
import NavAdmin from "./NavAdmin";
import axiosInstance from "../../config/api";
import { useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";

const UpdateKategori = () => {
  const { kategori_id } = useParams();
  const [inputProduct, setInputProduct] = useState("");
  const handleSubmit = async () => {
    try {
      const data = {
        nama_kategori: inputProduct,
      };
      const res = await axiosInstance.put(`/kategori/${kategori_id}`, data);
      alert("berhasil update")
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

export default UpdateKategori;
