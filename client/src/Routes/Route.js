import { Route } from "react-router-dom";
import React from "react";
import HomePage from "../pages/HomePage/HomePage";
import DetailProduct from "../pages/DetailProduct/DetailProduct";
import OrderStatus from "../pages/OrderStatus";
import CekTransaksi from "../pages/CekTransaksi/CekTransaksi";
import Checkout from "../pages/Checkout/Checkout";
import LoginRegister from "../pages/LoginRegister/LoginRegister";
import Dashboard from "../pages/Admin/DashboardAdmin";
import Product from "../pages/Admin/Product";
import AddProduct from "../pages/Admin/Component/AddProduct";
import Kategori from "../pages/Admin/Kategori";
import AddKategori from "../pages/Admin/Component/AddKategori";
import UpdateProduct from "../pages/Admin/UpdateProduct";
import DetailProductAdmin from "../pages/Admin/DetailProductAdmin";
import UpdateKategori from "../pages/Admin/UpdateKategori";
import Users from "../pages/Admin/Users";
import Protected from "./Protected";

const routes = [
  // customer route
  <Route
    path="/"
    element={
      <Protected customerPage={true}>
        <HomePage />
      </Protected>
    }
  />,
  // <Route path="/" element={<HomePage />} />,
  <Route
    path="/product/:product_id"
    element={
      <Protected customerPage={true}>
        <DetailProduct />
      </Protected>
    }
  />,
  <Route
    path="/order-status"
    element={
      <Protected customerPage={true}>
        <OrderStatus />
      </Protected>
    }
  />,
  <Route path="/cek-transaksi" element={<CekTransaksi />} />,
  <Route
    path="/checkout"
    element={
      <Protected customerPage={true}>
        <Checkout />
      </Protected>
    }
  />,

  <Route path="/login" element={<LoginRegister />} />,

  // admin route
  <Route
    path="/dashboard"
    element={
      <Protected ownerPage={true}>
        <Dashboard />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/product"
    element={
      <Protected adminPage={true}>
        <Product />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/kategori"
    element={
      <Protected adminPage={true}>
        <Kategori />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/users"
    element={
      <Protected ownerPage={true}>
        <Users />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/add-product"
    element={
      <Protected adminPage={true}>
        <AddProduct />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/add-kategori"
    element={
      <Protected adminPage={true}>
        <AddKategori />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/edit-product/:product_id"
    element={
      <Protected adminPage={true}>
        <UpdateProduct />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/edit-kategori/:kategori_id"
    element={
      <Protected adminPage={true}>
        <UpdateKategori />
      </Protected>
    }
  />,
  <Route
    path="/dashboard/detail-product/:product_id"
    element={
      <Protected adminPage={true}>
        <DetailProductAdmin />
      </Protected>
    }
  />,
];

export default routes;
