import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./Utils/PlusIcon";
import { VerticalDotsIcon } from "./Utils/VerticalDotsIcon";
import { SearchIcon } from "./Utils/SearchIcon";
import { ChevronDownIcon } from "./Utils/ChevronDownIcon";
import axiosInstance from "../../../config/api";
import { capitalize } from "./Utils/Utils";
import { Link, useLocation, useNavigate } from "react-router-dom";

const INITIAL_VISIBLE_COLUMNS = ["product", "harga", "actions", "status"];

export default function TableProduct() {
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = React.useState(1);
  const [totalProduct, setTotalProduct] = React.useState(0);
  const [dataProduct, setDataProduct] = useState([]);
  const columns = [
    { name: "PRODUCT", uid: "product" },
    { name: "HARGA", uid: "harga" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
  ];
  const [dataKategori, setDataKategori] = useState([]);
  const param = useLocation();
  const [currentCategory, setCurrentCategory] = useState(
    new URLSearchParams(param.search).get("kategori")
  );
  console.log(currentCategory);
  const getData = async () => {
    try {
      const data = await axiosInstance.get(
        `/product?kategori=${
          currentCategory ? currentCategory : ""
        }&search=&sortBy=&page=${page}&pageSize=${rowsPerPage}`
      );
      setDataProduct(data.data.data);
      setPages(data.data.totalPages);
      setTotalProduct(data.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };
  const getKategori = async () => {
    try {
      const data = await axiosInstance.get("kategori?status=active");
      setDataKategori(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getKategori();
  }, []);
  useEffect(() => {
    getData();
  }, [page, setPage, rowsPerPage, setRowsPerPage]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: ` ${
                process.env.REACT_APP_API_IMAGE_SERVER_URL
              }${user.image_product.substring(6)} `,
            }}
            description={user.nama_kategori}
            name={user.nama_product}
          >
            {user.nama_product}
          </User>
        );
      case "harga":
        return (
          <h3 className="overflow-scroll font-semibold my-2 ">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(user.harga)}
          </h3>
        );
      case "status":
        return (
          <Chip color={user.status === "active" ? "success" : "warning"}>
            {user.status}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-2">
            <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>
                  <Link to={`/dashboard/detail-product/${user.id}`}>
                    Detail
                  </Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to={`/dashboard/edit-product/${user.id}`}>Edit</Link>
                </DropdownItem>
                <DropdownItem onClick={() => handleDelete(user.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);

      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const handleSearch = async () => {
    const data = await axiosInstance.get(
      `/product?kategori=&search=${filterValue}&sortBy=&page=${page}&pageSize=${rowsPerPage}`
    );
    setDataProduct(data.data.data);
    setPages(data.data.totalPages);
    setTotalProduct(data.data.totalItems);
    console.log(data);
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`/product/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowAllProduct = async () => {
    try {
      getData();
      window.location.href = `/dashboard/product`;
    } catch (error) {
      console.log(error);
    }
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex text-white flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            className="w-full md:max-w-[40%]"
            placeholder="Search by product..."
            endContent={<SearchIcon />}
            value={filterValue}
            onClear={() => handleSearch()}
            onValueChange={onSearchChange}
          />

          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  // variant="flat"
                >
                  {currentCategory ? currentCategory : "Select Kategori"}
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Static Actions">
                {dataKategori.map((column) => (
                  <DropdownItem
                    onClick={() => {
                      window.location.href = `/dashboard/product?kategori=${column.nama_kategori}`;
                    }}
                    key={column.uid}
                    className="capitalize"
                  >
                    {capitalize(column.nama_kategori)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              onClick={handleShowAllProduct}
              color="primary"
              className="max-w-[50%] text-white"
            >
              All Product
            </Button>

            <Link to={"/dashboard/add-product"}>
              <Button color="primary">
                Add
                <PlusIcon className="inline text-sm" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-200 text-small">
            Total {totalProduct} Product
          </span>
          <label className="flex items-center text-slate-200 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-slate-200 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    dataProduct?.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
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
    );
  }, [page, pages, hasSearchFilter]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "",
      }}
      selectionMode="none"
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No product found"}
        items={dataProduct ? dataProduct : []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
