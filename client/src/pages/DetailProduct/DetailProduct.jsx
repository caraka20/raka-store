import React, { useEffect, useState } from "react";
import UTM from "../../assets/ICON.png";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../config/api";
import ModalCheckout from "../Checkout/ModalCheckout";
import Nav from "../../components/Nav";

const DetailProduct = () => {
  const { product_id } = useParams();
  const [DetailProduct, setDetailProduct] = useState(null);
  const getDetailProduct = async () => {
    try {
      const res = await axiosInstance.get(`/product/${product_id}`);
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
    <div className="w-full mb-5 text-white  flex h-full flex-col justify-center items-center">
      <div className="max-w-[504px] h-screen border border-b-zinc-500 min-w-[100px]">
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
        <Link className="fixed bottom-0 w-full max-w-[504px]" to={"/checkout"}>
          <button className="bg-blue-500 w-full bottom-0 mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
            BUY NOW
          </button>
        </Link>

        {/* <div className=" p-3 fixed bottom-0 rounded-lg w-full">
          <p className="flex justify-center">
            <ModalCheckout />
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default DetailProduct;
