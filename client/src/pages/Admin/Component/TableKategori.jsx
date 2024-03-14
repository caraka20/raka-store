import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Chip,
} from "@nextui-org/react";
import axiosInstance from "../../../config/api";
import { VerticalDotsIcon } from "./Utils/VerticalDotsIcon";
import { Link } from "react-router-dom";
import { PlusIcon } from "./Utils/PlusIcon";
import Kategori from "../Kategori";

export default function TableKategori() {
  const [dataKategori, setDataKategori] = useState([]);
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/kategori");
      setDataKategori(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleHapus = async (kategori_id) => {
    try {
      const res = await axiosInstance.delete(`/kategori/${kategori_id}`);
      alert("Succes Delete Kategori");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (kategori_id) => {
    try {
      const res = await axiosInstance.put(`/kategori?kategori_id=${kategori_id}`);
      alert("Succes Update Status Kategori");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      {/* <div className="flex justify-end w-full"> */}
      <Link
        to={"/dashboard/add-kategori"}
        className="bg-[#338EF7] justify-center self-end mb-5 md:max-w-[50%] items-center flex text-white p-[10px] rounded-md font-light"
      >
        Add New
        <PlusIcon className="inline text-sm" />
      </Link>
      {/* </div> */}

      <div className="">
        <Table
          aria-label="Example static collection table"
          selectionMode="single"
          defaultSelectedKeys={[]}
        >
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No product found"}>
            {dataKategori &&
              dataKategori.map((kategori, index) => {
                return (
                  <TableRow key={kategori.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{kategori.nama_kategori}</TableCell>
                    <TableCell><Chip color={kategori.status === "active" ? "success" : "danger"}>{kategori.status}</Chip></TableCell>
                    <TableCell>
                      <div className="relative flex justify-start items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              radius="full"
                              size="sm"
                              variant="light"
                            >
                              <VerticalDotsIcon className="text-default-400" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem><Link to={`/dashboard/edit-kategori/${kategori.id}`}>Edit</Link></DropdownItem>
                            <DropdownItem onClick={()=>handleStatus(kategori.id)}>Update Status</DropdownItem>
                            <DropdownItem
                              onClick={() => handleHapus(kategori.id)}
                            >
                              Hapus
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
