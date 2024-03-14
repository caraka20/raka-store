import React, { useEffect, useState } from "react";
import { BsCartCheck } from "react-icons/bs";
import axiosInstance from "../../../config/api";
import { MdAttachMoney } from "react-icons/md";
import { GoAlert } from "react-icons/go";
import { FaFileCirclePlus } from "react-icons/fa6";

const Card = ({ dataTrx, dataProduct }) => {
  return (
    <div className="atas grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 mx-5">
      <div className="border border-white rounded-lg overflow-hidden hover:shadow-xl">
        <div className="p-4 grid">
          <BsCartCheck className="mb-2 text-4xl text-green-600" />
          <span className="text-2xl font-semibold my-2 ">
            {dataTrx ? dataTrx.productTerjual : 0}
          </span>
          <span className="font-light">Product Terjual</span>
        </div>
      </div>
      <div className="border border-white rounded-lg overflow-hidden hover:shadow-xl">
        <div className="p-4 justify-between flex flex-col">
          <MdAttachMoney className="mb-2 text-4xl text-green-600" />
          <h3 className="text-2xl overflow-scroll font-semibold my-2 ">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(dataTrx ? dataTrx.pendapatan : 0)}
          </h3>
          <span className="font-light">Pendapatan</span>
        </div>
      </div>
      <div className="border border-white rounded-lg overflow-hidden hover:shadow-xl">
        <div className="p-4 grid">
          <FaFileCirclePlus className="mb-2 text-4xl text-green-600" />
          <span className="text-2xl font-semibold my-2 ">
            {dataProduct ? dataProduct : "0"}
          </span>
          <span className="font-light">Total Product</span>
        </div>
      </div>
      <div className="border border-white rounded-lg overflow-hidden hover:shadow-xl">
        <div className="p-4 grid">
          <GoAlert className="mb-2 text-4xl text-red-600" />
          <span className="text-2xl font-semibold my-2 ">
            {dataTrx ? dataTrx.productTerjual : 0}
          </span>
          <span className="font-light">Menunggu Pembayaran</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
