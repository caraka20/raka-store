import React, { useEffect, useState } from "react";
import UTM from "../../assets/ICON.png";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../config/api";
import ModalCheckout from "../Checkout/ModalCheckout";
import Nav from "../../components/Nav";

const DetailProductAdmin = () => {
  const { product_id } = useParams();
  const [DetailProduct, setDetailProduct] = useState(null);
  const getDetailProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product/${product_id}`);
      console.log(res.data.data);
      setDetailProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(process.env.REACT_APP_API_BASE_URL);
  useEffect(() => {
    getDetailProduct();
  }, []);
  return (
    <div className="w-full mb-5 text-white items-start justify-center flex h-[100vh]">
      <div className="max-w-[504px] border h-[100vh] border-b-zinc-500 min-w-[100px]">
        <Nav />
        <div className="mb-5 mt-[1px]">
          <img
            className="w-full max-h-[400px]"
            // src={DetailProduct?.image_product}
            src={`${
              process.env.REACT_APP_API_IMAGE_SERVER_URL
            }${DetailProduct?.image_product?.substring(6)}`}
            alt="Gambar Product"
          />
        </div>
        <div className="mx-3 grid grid-cols-3 items-center">
          <div className="col-span-2 font-semibold text-xl">
            {DetailProduct?.nama_product}
          </div>
          <div className="col-span-1 font-light flex justify-end items-end  pr-[5px] text-green-600 text-large">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(DetailProduct?.harga)}
          </div>
        </div>
        <div className="mx-3 mt-5 space-x-2 mb-12 ">
          <div className="font-serif ">
            <p className="mb-3">DESCRIPTION</p>
            <div>
              {/* {DetailProduct?.description} */}
              <div
                dangerouslySetInnerHTML={{ __html: DetailProduct?.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductAdmin;
