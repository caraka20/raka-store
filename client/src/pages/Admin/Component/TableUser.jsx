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
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "./Utils/PlusIcon";
import Kategori from "../Kategori";
import Cookies from "js-cookie";

export default function TableUsers() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const getData = async () => {
    try {
      const res = await axiosInstance.get("/auth");
      setDataUser(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (user_id, role) => {
    try {
      let data = role;
      if (role === "customer") {
        data = "admin";
      } else {
        data = "customer";
      }
      console.log(data);
      const respon = await axiosInstance.put(`/auth/${user_id}`, {
        role: data,
      });
      alert("Succes Update Role");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleLogout = () => {
  //     Cookies.remove("user_token");
  //     navigate("/");
  //   };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full">
      <div className="">
        <Table
          aria-label="Example static collection table"
          selectionMode="single"
          defaultSelectedKeys={[]}
        >
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No product found"}>
            {dataUser &&
              dataUser.map((item, index) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className={item.role === "owner" && "hidden"}>
                      {index + 1}
                    </TableCell>
                    <TableCell className={item.role === "owner" && "hidden"}>
                      {item.nama_user}
                    </TableCell>
                    <TableCell className={item.role === "owner" && "hidden"}>
                      {item.email_user}
                    </TableCell>
                    <TableCell className={item.role === "owner" && "hidden"}>
                      {item.role}
                    </TableCell>
                    <TableCell>
                      <div className="relative flex justify-start items-center gap-2">
                        <Dropdown className="bg-background border-1 border-default-200">
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              radius="full"
                              size="sm"
                              variant="light"
                              className={item.role === "owner" && "hidden"}
                            >
                              <VerticalDotsIcon className="text-default-400" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={() => handleStatus(item.id, item.role)}
                            >
                              ubah ke{" "}
                              {item.role === "admin" ? "customer" : "admin"}
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
