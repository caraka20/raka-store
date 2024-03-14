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

export default function ModalCheckout() {
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
      if (!customer.nama_lengkap || !customer.email) {
        alert(`${!customer.nama_lengkap ? "Nama" : "Email"} harus diisi`);
        return;
      }
      const response = await axios.post(`${api}/transaction`, {
        nama_lengkap: customer.nama_lengkap,
        email: customer.email,
        product_id: dataProduct.product_id,
        harga: dataProduct.harga,
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
        onClose: async function () {
          await axiosInstance.put(`/transaction/${response.data.data.id}`, {
            status: "CANCEL",
          });
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
    <div className="flex justify-center items-center flex-col gap-2">
      <Button
        onPress={onOpen}
        className={snapShow ? "hidden" : `max-w-fit bg-transparent`}
      >
        BUY NOW
      </Button>
      <Modal
        isOpen={isOpen}
        placement={modalPlacement}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {!snapShow && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Detail Product
                  </ModalHeader>
                  <ModalBody>
                    <div className="border py-3 border-black w-full grid grid-cols-3">
                      <div className="col-span-1">
                        <Image
                          alt="Card background"
                          className="object-cover p-2"
                          src={UTM}
                          width={130}
                        />
                      </div>
                      <div className=" col-span-2 flex flex-col justify-around">
                        <div>
                          {dataProduct?.nama_product}{" "}
                          <span className="font-bold">( 1 item )</span>
                        </div>
                        <div>
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(dataProduct?.harga)}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-4">
                      <Input
                        type="text"
                        value={customer?.nama_lengkap}
                        onChange={handleChange}
                        name="nama_lengkap"
                        placeholder="Nama Lengkap"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={customer?.email}
                        onChange={handleChange}
                        name="email"
                      />
                    </div>
                    {/* <span>Cek Email Setelah Pembayaran</span> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onClick={onClose}>
                      Tutup
                    </Button>
                    <Button color="primary" onClick={toTransaction}>
                      Action
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
      <div id="snap-container"></div>
    </div>
  );
}
