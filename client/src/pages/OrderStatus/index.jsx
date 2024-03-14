import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/api";
import { Button } from "@nextui-org/react";
import bg from "../../assets/bg.png";

const OrderStatus = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const param = useLocation();
  const [currentUid, setCurrentUid] = useState(
    new URLSearchParams(param.search).get("transaksi_uid")
  );
  const [pathFile, setPathFile] = useState(null);
  const getData = async () => {
    try {
      const res = await axiosInstance.get(
        `transaction/order-status?transaksi_uid=${currentUid}`
      );
      setDataTransaksi(res.data.data);
      setPathFile(res.data.data[0].product.file);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${pathFile.substring(6)}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${pathFile.split("-").pop()}`); // Atur nama file ketika diunduh
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  const nav = useNavigate();
  const onBack = () => {
    nav("/");
  };
  useEffect(() => {
    getData();
  }, []);
  const bgStyle = {
    backgroundImage: `url("https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?w=1800&t=st=1710404168~exp=1710404768~hmac=0b6532ee3d9d50f98ed5ed982bc3939f579e66d112dfb133696820b41191b4ea")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1, // Menempatkan latar belakang di belakang konten
  };

  return (
    <div
      className="w-full text-white  items-center justify-center h-full p-[20px]"
      // style={{
      //   backgroundImage: `url(${bg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <div style={bgStyle}></div>
      <div className=" border h-full border-zinc-500 w-full p-[20px] m-auto rounded-sm mb-[20px] grid gap-[20px]">
        <div className="">
          <p className="m-0 text-[1em] font-bold from-neutral-600">
            Transaction_ID
          </p>
          <p className="m-0 text-[1em] font-normal from-neutral-600">
            {dataTransaksi[0]?.transaksi_uid}
          </p>
        </div>
        <div className="">
          <p className="m-0 text-[1em] font-bold from-neutral-600">
            Customer Name
          </p>
          <p className="m-0 text-[1em] font-normal from-neutral-600">
            {dataTransaksi[0]?.nama_lengkap}
          </p>
        </div>
        <div className="">
          <p className="m-0 text-[1em] font-bold from-neutral-600">
            Customer Email
          </p>
          <p className="m-0 text-[1em] font-normal from-neutral-600">
            {dataTransaksi[0]?.email}
          </p>
        </div>
        <div className="">
          <p className="m-0 text-[1em] font-bold from-neutral-600">Status</p>
          <p className="m-0 text-[1em] font-normal from-neutral-600">
            {dataTransaksi[0]?.status}
          </p>
          {dataTransaksi[0]?.status === "PEMBAYARAN SELESAI" && (
            <p
              onClick={handleDownload}
              className="m-0 underline hover:text-blue-900 text-blue-600 text-[1em] font-normal from-neutral-600"
            >
              Download Disini
            </p>
          )}
        </div>
      </div>

      <div className="border h-full border-zinc-500 w-full p-[20px] m-auto rounded-sm mb-[20px] grid gap-[20px]">
        <div className="flex justify-between">
          <div className="font-medium">
            {dataTransaksi[0]?.product?.nama_product} {`x1`}
          </div>
          <div>
            {" "}
            <h3 className="font-normal text-green-700 text-sm mt-1">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(dataTransaksi[0]?.product.harga)}
            </h3>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="">total </div>
          <div>
            {" "}
            <h3 className="font-normal text-green-700 text-sm mt-1">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(dataTransaksi[0]?.product.harga)}
            </h3>
          </div>
        </div>
      </div>
      <Button color="danger" onClick={onBack}>
        Back Home
      </Button>
    </div>
  );
};

export default OrderStatus;
