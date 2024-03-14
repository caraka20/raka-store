import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronDownIcon } from "./Component/Utils/ChevronDownIcon";
import Cookies from "js-cookie";

export default function NavAdmin() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/").pop();
  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("role");
    navigate("/");
  };

  return (
    <Navbar
      className="bg-[#676ddb] text-white"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand isActive>
          {/* <AcmeLogo /> */}
          <Link to={"/dashboard"}>
            <p className="font-bold text-inherit">RAKA STORE</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="" to={"/dashboard"}>
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Dropdown>
            <DropdownTrigger>
              <Button className="text-white" variant="light">
                Product <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="new">
                <Link to={"/dashboard/product"} aria-current="">
                  Product
                </Link>
              </DropdownItem>
              <DropdownItem key="copy">
                <Link to={"/dashboard/kategori"} aria-current="">
                  Kategori
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="" to={"/dashboard/users"}>
            Users
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Button
            onClick={handleLogout}
            className="text-slate-9"
            size="sm"
            color="danger"
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem className="grid gap-2">
          <Button color={path === "dashboard" ? "secondary" : "primary"}>
            <Link className="w-full " to={"/dashboard"} size="lg">
              Dashboard
            </Link>
          </Button>
          <Button color={path === "product" ? "secondary" : "primary"}>
            <Link
              className="w-full text-slate-9"
              to={"/dashboard/product"}
              size="lg"
            >
              Product
            </Link>
          </Button>
          <Button color={path === "kategori" ? "secondary" : "primary"}>
            <Link
              className="w-full text-slate-9"
              to={"/dashboard/kategori"}
              size="lg"
            >
              Kategori
            </Link>
          </Button>
          <Button color={path === "users" ? "secondary" : "primary"}>
            <Link
              className="w-full text-slate-9"
              to={"/dashboard/users"}
              size="lg"
            >
              Users
            </Link>
          </Button>

          <Button
            onClick={handleLogout}
            className="text-slate-9"
            size="lg"
            color="danger"
          >
            Logout
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
