import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Image,
  Input,
} from "@nextui-org/react";
import UTM from "../../assets/ICON.png";
import useSnap from "../../hooks/useSnap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../config/api";
import toast, { Toaster } from "react-hot-toast";

const Checkout = () => {
  const api = process.env.REACT_APP_API_BASE_URL;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  const [dataProduct, setDataProduct] = useState(
    JSON.parse(localStorage.getItem("productData"))
  );
  console.log(dataProduct);
  const [customer, setCustomer] = useState({
    nama_lengkap: "",
    email: "",
    no_wa: "",
  });
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const [snapShow, setSnapShow] = useState(false);
  const { snapEmbed } = useSnap();

  const toTransaction = async () => {
    try {
      if (!customer.nama_lengkap || !customer.email || !customer.no_wa) {
        toast.error("Data tidak boleh kosong!");
        return;
      }

      const response = await axios.post(`${api}/transaction`, {
        nama_lengkap: customer.nama_lengkap,
        email: customer.email,
        product_id: dataProduct.product_id,
        harga: dataProduct.harga,
        no_wa: customer.no_wa,
      });
      setSnapShow(true);
      snapEmbed(response.data.data.snap_token, "snap-container", {
        onSuccess: async function (result) {
          await axiosInstance.put(`/transaction/${response.data.data.id}`, {
            status: "PEMBAYARAN SELESAI",
          });
          console.log("success", result);
          navigate(
            `/order-status?transaksi_uid=${response.data.data.transaksi_uid}`
          );
          setSnapShow(false);
        },
        onPending: async function (result) {
          await axiosInstance.put(`/transaction/${response.data.data.id}`, {
            status: "PENDING",
          });
          console.log("pending", result);
          navigate(
            `/order-status?transaksi_uid=${response.data.data.transaksi_uid}`
          );
          setSnapShow(false);
        },
      });
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div className="w-full text-white max-w-[504px] items-center justify-center h-screen p-[20px]">
      <Toaster />
      {!snapShow && (
        <>
          <div className="border h-full border-zinc-500 w-full p-[20px] m-auto rounded-sm mb-[20px] grid gap-[20px]">
            <div className="border py-3 border-black w-full p-5 grid">
              <div className="mb-4 flex justify-between">
                <span>Product : </span>
                <span className="font-bold">
                  {" "}
                  {dataProduct?.nama_product} ( 1 item )
                </span>
              </div>
              <div className="flex justify-between">
                <span>Harga :</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(dataProduct?.harga)}
                </span>
              </div>
              {/* </div> */}
            </div>
            <div className="flex w-full flex-col gap-4">
              <span className="text-white font-mono py-1 px-3 rounded-md relative">
                <span className="text-red-500">*</span> Mohon isi data dengan
                benar
              </span>

              <div className="">
                <label htmlFor="">Nama Lengkap</label>
                <Input
                  type="text"
                  value={customer?.nama_lengkap}
                  onChange={handleChange}
                  name="nama_lengkap"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>

              <div>
                <label htmlFor="">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  value={customer?.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>

              <div>
                <label htmlFor="">No Whatsapp</label>
                <Input
                  type="no_wa"
                  placeholder="628xxxxx"
                  value={customer?.no_wa}
                  onChange={handleChange}
                  name="no_wa"
                />
              </div>

              <Button color="primary" onClick={toTransaction}>
                BUY NOW
              </Button>
            </div>
          </div>
        </>
      )}

      <div
        className={snapShow && ` h-screen w-full m-auto rounded-sm`}
        id="snap-container"
      ></div>
    </div>
  );
};

export default Checkout;
