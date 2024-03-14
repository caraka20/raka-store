import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Pagination,
  Button,
} from "@nextui-org/react";

export default function TableTransaction({ data }) {
  const [dataTrx, setDataTrx] = useState([]);
  const statusOptions = [
    { name: "PEMBAYARAN SELESAI", uid: "pembayaran selesai" },
    { name: "MENUNGGU PEMBAYARAN", uid: "MENUNGGU PEMBAYARAN" },
  ];
  const columns = [
    // { name: "NO", uid: "no", sortable: true },
    { name: "TRANSAKSI_UID", uid: "transaksi_uid" },
    { name: "PRODUCT", uid: "product" },
    { name: "HARGA", uid: "harga" },
    { name: "CUSTOMER", uid: "customer" },
    // { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status" },
  ];

  const [filterValue, setFilterValue] = useState("");
  //   const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "harga",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...dataTrx];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.transaksi_uid.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [dataTrx, filterValue, statusFilter]);

  useEffect(() => {
    setDataTrx(data);
  }, [data]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey, index) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "product":
        return (
          <div className="flex flex-col">
            <div className="font-semibold">{user?.product?.nama_product}</div>
            <div className="text-bold text-tiny">
              {user?.product?.kategori?.nama_kategori}
            </div>
          </div>
        );
      case "harga":
        return (
          <h3 className="overflow-scroll font-semibold my-2 ">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(user?.product?.harga)}
          </h3>
        );
      case "customer":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{user.email}</p>
            <p className="text-bold text-tiny text-default-400">{user.no_wa}</p>
          </div>
        );
      case "status":
        let statusColor = "";
        let statusText = "";
        if (user.status === "PEMBAYARAN SELESAI") {
          statusColor = "success";
          statusText = "OK";
        } else if (user.status === "MENUNGGU PEMBAYARAN") {
          statusColor = "warning";
          statusText = "Pending";
        }
        return (
          <Chip
            className="capitalize"
            color={statusColor}
            size="sm"
            variant="flat"
          >
            {statusText}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  // const bottomContent = useMemo(() => {
  //   return (
  //     <div className="py-2 px-2 flex justify-between items-center">
  //       <span className="w-[30%] text-small text-default-400">
  //         total {dataTrx.length} transaction
  //       </span>
  //       <Pagination
  //         isCompact
  //         showControls
  //         showShadow
  //         color="primary"
  //         page={page}
  //         total={pages}
  //         onChange={setPage}
  //       />
  //       <div className="hidden sm:flex w-[30%] justify-end gap-2">
  //         <Button
  //           isDisabled={pages === 1}
  //           size="sm"
  //           variant="flat"
  //           onPress={onPreviousPage}
  //         >
  //           Previous
  //         </Button>
  //         <Button
  //           isDisabled={pages === 1}
  //           size="sm"
  //           variant="flat"
  //           onPress={onNextPage}
  //         >
  //           Next
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }, [items.length, page, pages, hasSearchFilter]);

  return (
    <Table
    className=""
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      // bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "",
      }}
      selectionMode="none"
      sortDescriptor={sortDescriptor}
      topContentPlacement="outside"
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
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
      <TableBody  emptyContent={"No transaction found"} items={sortedItems}>
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
