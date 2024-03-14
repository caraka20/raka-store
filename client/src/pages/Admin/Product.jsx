import React from "react";
import NavAdmin from "./NavAdmin";
import TableProduct from "./Component/TableProduct";

const Product = () => {
  return (
    <div className="w-full">
      <NavAdmin />
      <div className="m-5">
        <TableProduct />
      </div>
    </div>
  );
};

export default Product;
