import React, { useCallback, useEffect, useState } from "react";
import NavAdmin from "./NavAdmin";
import Card from "./Component/Card";
import axiosInstance from "../../config/api";
import TableTransaction from "./Component/TableTransaction";
import { IoIosSearch } from "react-icons/io";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [dataTrx, setDataTrx] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const param = useLocation();
  const [status, setStatus] = useState(
    new URLSearchParams(param.search).get("status")
  );
  const [totalProduct, setTotalProduct] = useState(0);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pages, setPages] = useState(1);

  const onSearchChange = (e) => {
    setSearch(e);
  };

  const cariTransaksi = async () => {
    navigate("/dashboard");
    if (search) {
      const getTrx = await axiosInstance.get(
        `/transaction/order-status?transaksi_uid=${search}`
      );
      setDataTrx(getTrx.data.data);
    }
  };

  const handleStatusChange = (e) => {
    // setCurrentStatus(e.target.value);
    if (e.target.value === "All Status") {
      return (window.location.href = `/dashboard`);
    }
    window.location.href = `/dashboard?status=${e.target.value}`;
  };

  const [dataAll, setDataAll] = useState([]);
  const getAll = async () => {
    try {
      const getTrx = await axiosInstance.get(`/transaction/report`);
      setDataAll(getTrx.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAll();
  }, []);

  const fetchData = async () => {
    try {
      if (status) {
        const getTrx = await axiosInstance.get(
          `/transaction?nama_product=&email=&kategori_id=&status=${status}&startDate=&endDate=&page=${page}&pageSize=${rowsPerPage}`
        );
        setPages(getTrx.data.totalPages);
        setTotalProduct(getTrx.data.totalItems);
        setDataTrx(getTrx.data.data);
      } else {
        const getTrx = await axiosInstance.get(
          `/transaction?nama_product=&email=&kategori_id=&status=&startDate=&endDate=&page=${page}&pageSize=${rowsPerPage}`
        );
        setPages(getTrx.data.totalPages);
        setTotalProduct(getTrx.data.totalItems);
        setDataTrx(getTrx.data.data);
      }

      const getProduct = await axiosInstance.get(`/product?page=1&pageSize=6`);
      setDataProduct(getProduct.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const handleShowAllTrx = async () => {
    try {
      window.location.href = `/dashboard`;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, setPage]);

  return (
    <div className="w-full text-white">
      <NavAdmin />
      <div className="pembungkus">
        <Card dataTrx={dataAll} dataProduct={dataProduct} />
      </div>
      <div className="m-5">
        <div className="flex justify-between gap-3 items-end">
          <Input
            className="w-full sm:max-w-[44%]"
            placeholder={`Search by transaksi_uid...`}
            onValueChange={onSearchChange}
            endContent={
              <IoIosSearch
                className="font-semibold cursor-pointer text-2xl"
                onClick={cariTransaksi}
              />
            }
          />
          <div className="flex min-w-[250px] text-slate-600 gap-3">
            <select
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              onChange={handleStatusChange}
            >
              <option value="" disabled selected>
                {status ? status : "Status Pembayaran"}
              </option>
              <option value={"PEMBAYARAN SELESAI"}>Pembayaran Selesai</option>
              <option value={"MENUNGGU PEMBAYARAN"}>Menunggu Pembayaran</option>
              <option value={"All Status"}>All Status</option>
            </select>
            <Button onClick={handleShowAllTrx} color="primary">
              All Trx
            </Button>
          </div>
        </div>
      </div>
      <div className="m-5 bg-slate-400 text-slate-600">
        <TableTransaction data={dataTrx} />
      </div>
      <div className="py-2 px-5 flex justify-center sm:justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden text-white sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            // variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            // variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
