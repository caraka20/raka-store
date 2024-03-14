import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import { Routes } from "react-router-dom";
import routes from "./Routes/Route";
import NavAdmin from "./pages/Admin/NavAdmin";

function App() {
  const bgStyle = {
    backgroundImage: `url("https://img.freepik.com/free-vector/circles-background-dark-tones_60389-166.jpg?w=1800&t=st=1710404168~exp=1710404768~hmac=0b6532ee3d9d50f98ed5ed982bc3939f579e66d112dfb133696820b41191b4ea")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  };
  const location = useLocation();

  // Check jika lokasi saat ini adalah '/login'
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/dashboard";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center"  >
      {/* Hanya menampilkan Nav jika bukan halaman Login */}
      {/* {!isLoginPage && <Nav />}
  <NavAdmin /> */}
      <div style={bgStyle}></div>
      <Routes>{routes.map((value) => value)}</Routes>
    </div>
  );
}

export default App;
