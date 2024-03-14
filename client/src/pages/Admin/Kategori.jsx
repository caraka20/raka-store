import React from "react";
import NavAdmin from "./NavAdmin";
import TableKategori from "./Component/TableKategori";

const Kategori = () => {
  return (
    <div className="w-full">
      <NavAdmin />
      <div className="m-5">
        <TableKategori />
      </div>
    </div>
  );
};

export default Kategori;
