import { Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../config/api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import Nav from "../../components/Nav";

const CekTransaksi = () => {
  const param = useLocation();
  const [email, setEmail] = useState("");
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const currentEmail = new URLSearchParams(param.search).get("email") || "";

  const handleSearch = (e) => {
    setEmail(e.target.value);
  };

  const cariEmail = async () => {
    try {
      window.location.href = `/cek-transaksi?email=${email}`;
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      if (currentEmail) {
        const response = await axiosInstance.get(
          `/transaction?email=${currentEmail}&status=PEMBAYARAN SELESAI&page=1&pageSize=200`
        );
        setDataTransaksi(response.data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [currentEmail]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(dataTransaksi?.length / rowsPerPage);

  const items = React.useMemo(() => {
    if (!Array.isArray(dataTransaksi)) return [];
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return dataTransaksi?.slice(start, end);
  }, [page, dataTransaksi]);

  // Fungsi untuk menangani klik pada kolom "Detail"
  const handleDownload = async (item) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_IMAGE_SERVER_URL}${item.substring(6)}`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${item.split("-").pop()}`); // Atur nama file ketika diunduh
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex text-white  flex-col justify-center items-center">
      <div className=" w-full max-w-[504px]">
        <Nav />
      </div>
      <div className="border rounded-sm p-2 max-w-[504px] w-full h-[100vh]">
        <div className="max-w-[504px] px-[5px] w-full  m-auto min-w-[100px]">
          <label className="font-semibold  px-[10px]">
            Cek Email Transaksi
          </label>
          <Input
            classNames={{
              size: "xl",
              base: "h-10 mt-[10px]",
              mainWrapper: "h-full w-[100%]",
              input: "text-small w-[100%]",
              inputWrapper: "h-full font-normal text-default-500",
            }}
            onChange={handleSearch}
            placeholder={!currentEmail ? "Email Transaksi..." : currentEmail}
            size="sm"
            startContent={<IoIosSearch />}
            type="search"
          />
          <button
            onClick={cariEmail}
            className="bg-blue-500 w-full  mt-4 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Cek Transaksi
          </button>
        </div>
        <div className="w-full max-w-[504px] mt-5">
          {dataTransaksi.length > 0 ? (
            <Table
              aria-label="Example table with client side pagination"
              className="w-full"
              bottomContent={
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="secondary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                  />
                </div>
              }
              classNames={
                {
                  // wrapper: "min-h-[222px]",
                }
              }
            >
              <TableHeader>
                <TableColumn key="nama_product">Nama File</TableColumn>
                <TableColumn key="email">Detail</TableColumn>
              </TableHeader>
              <TableBody items={items}>
                {(item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product?.nama_product}</TableCell>
                    <TableCell
                      className="text-sky-600 cursor-pointer underline hover:text-sky-800"
                      onClick={() => handleDownload(item.product?.file)}
                    >
                      Download
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center mt-4">No Result</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CekTransaksi;
