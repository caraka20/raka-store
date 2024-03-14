import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [isHomeActive, setIsHomeActive] = useState(true);
  const [isCekTransaksiActive, setIsCekTransaksiActive] = useState(false);

  const handleHomeClick = () => {
    setIsHomeActive(true);
    setIsCekTransaksiActive(false);
  };

  const handleCekTransaksiClick = () => {
    setIsHomeActive(false);
    setIsCekTransaksiActive(true);
  };

  return (
    <Navbar className="w-full justify-center items-center bg-[#676ddb] border border-b-zinc-500 ">
      <NavbarContent>
        <NavbarBrand>
          <Link to="/" onClick={handleHomeClick}>
            <p className="text-white">RAKA STORE</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="text-white flex gap-4" justify="end">
        <NavbarItem isActive>
          <Link
            to="/"
            onClick={handleHomeClick}
            className={isHomeActive ? "text-black underline" : "text-white"}
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            to="/cek-transaksi"
            onClick={handleCekTransaksiClick}
            className={
              isCekTransaksiActive ? "text-black underline" : "text-white"
            }
          >
            Cek Transaksi
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
