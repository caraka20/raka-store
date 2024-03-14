import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image, Skeleton } from "@nextui-org/react";
import UTM from "../../assets/ICON.png";
import axiosInstance from "../../config/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@nextui-org/react";

const CardProduct = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Ubah sesuai dengan jumlah item per halaman yang diinginkan
  const param = useLocation();
  const [currentCategory, setCurrentCategory] = useState(
    new URLSearchParams(param.search).get("kategori")
  );
  const [currentSearch, setCurrentSearch] = useState(
    new URLSearchParams(param.search).get("search")
  );
  const [currentSort, setCurrentSort] = useState(
    new URLSearchParams(param.search).get("sortBy")
  );
  console.log(currentCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product
    ? product.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [totalProduct, setTotalProduct] = React.useState(0);

  const getProduct = async () => {
    try {
      const data = await axiosInstance.get(
        `/product?kategori=${currentCategory ? currentCategory : ""}&search=${
          currentSearch ? currentSearch : ""
        }&sortBy=&page=${page}&pageSize=${rowsPerPage}`
      );
      setProduct(data.data.data);
      setPages(data.data.totalPages);
      setTotalProduct(data.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  const toCheckout = (id, nama_product, harga) => {
    const productData = {
      product_id: id,
      harga,
      nama_product,
    };
    const productDataString = JSON.stringify(productData);
    localStorage.setItem("productData", productDataString);
  };

  useEffect(() => {
    getProduct();
  }, [page, setPage, rowsPerPage, setRowsPerPage]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {!product ? (
          <div className="flex col-span-2 my-10 justify-center items-center font-bold">
            Tidak ada product
          </div>
        ) : (
          product?.map((item) => {
            return (
              <Link
                key={item.id}
                onClick={() =>
                  toCheckout(item.id, item.nama_product, item.harga)
                }
                to={`/product/${item.id}`}
              >
                <Card className="pb-4 border-1 bg-slate-200 border-[#676ddb] ">
                  <CardBody
                    emptyContent={"No product found"}
                    className="overflow-visible"
                  >
                    <Image
                      alt="Card background"
                      className="object-cover rounded-lg"
                      src={`${
                        process.env.REACT_APP_API_IMAGE_SERVER_URL
                      }${item.image_product.substring(6)}`}
                      // width={}
                    />
                  </CardBody>
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="text-wrap font-serif text-base">
                      {item.nama_product}
                    </h4>
                    <h3 className="font-light text-emerald-700 text-sm mt-1">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.harga)}
                    </h3>
                  </CardHeader>
                </Card>
              </Link>
            );
          })
        )}
      </div>
      <div
        className={
          product?.length === 0 ? "hidden" : `flex justify-center mt-4`
        }
      >
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default CardProduct;
