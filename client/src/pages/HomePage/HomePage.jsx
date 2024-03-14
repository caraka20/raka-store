import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import { Button, Input } from "@nextui-org/react";
import { IoIosSearch, IoIosArrowBack } from "react-icons/io";
import { Select, SelectItem } from "@nextui-org/react";
import axiosInstance from "../../config/api";
import { useLocation } from "react-router-dom";
import Nav from "../../components/Nav";

const HomePage = () => {
  const [kategori, setKategori] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState("");
  const [searchProductName, setSearchProductName] = useState("");
  const param = useLocation();
  const [currentCategory, setCurrentCategory] = useState(
    new URLSearchParams(param.search).get("kategori")
  );
  const [currentSearch, setCurrentSearch] = useState(
    new URLSearchParams(param.search).get("search")
  );
  const [isSearch, setIsSearch] = useState(false);

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/kategori");
      setKategori(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleKategoriChange = (event) => {
    const selectedIndex = event.target.value;
    const data = kategori?.find(
      (item) => item.id === Number(selectedIndex)
    )?.nama_kategori;

    setSelectedKategori(data);
    window.location.href = `/?kategori=${data}&search=&sortBy=`;
  };

  const handleSearch = (e) => {
    setSearchProductName(e.target.value);
  };
  const search = () => {
    window.location.href = `/?kategori=${currentCategory}&search=${searchProductName}&sortBy=`;
  };
  const hapusSearch = () => {
    window.location.href = `/?kategori=&search=&sortBy=`;
  };
  // console.log(currentCategory);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" w-full mb-5 flex flex-col justify-center items-center">
      <div className="md:w-[60%] w-full  border border-b-zinc-500 ">
        <Nav />
        <div
          className={
            isSearch
              ? `flex mb-5  flex-cols h-12 items-center justify-around bg-green-800`
              : `flex mb-5 h-12 items-center justify-between  bg-green-800`
          }
        >
          <div className={isSearch ? `hidden` : ``}></div>
          <div
            className={
              isSearch ? `hidden` : `font-bold text-xl text-white pl-6`
            }
          >
            Home
          </div>
          <div
            className={isSearch ? `hidden` : `pr-3`}
            onClick={() => setIsSearch(true)}
          >
            <IoIosSearch className="text-2xl font-semibold text-white" />
          </div>
          <IoIosArrowBack
            className={
              isSearch ? `ml-2 text-xl text-white font-bold` : `hidden`
            }
            onClick={() => setIsSearch(false)}
          />
          <div
            className={
              isSearch
                ? `flex w-full mx-4 justify-between bg-slate-500`
                : `hidden`
            }
          >
            <Input
              classNames={{
                size: "lg",
                base: "h-10",
                mainWrapper: "h-full w-[100%]",
                input: "text-small w-[100%]",
                inputWrapper: "h-full font-normal text-default-500 ",
              }}
              onChange={handleSearch}
              placeholder={currentSearch ? currentSearch : "Cari Product..."}
              size="sm"
              startContent={<IoIosSearch />}
              type="search"
            />
          </div>
          <Button
            size="sm"
            className={isSearch ? `mr-2` : `hidden`}
            color="primary"
            onClick={search}
          >
            Cari
          </Button>
        </div>
        <div className=" mx-2 flex justify-between items-end gap-2 mb-5">
          {/* <div className="w-full"> */}
          <Select
            label="Select Kategori"
            placeholder={
              currentCategory !== "null" ? currentCategory : "Pilih Kategori"
            }
            className="max-w-xs"
            value={selectedKategori}
            onChange={handleKategoriChange}
          >
            {kategori.map((item) => (
              <SelectItem
                className="max-w-xs"
                key={item.id}
                value={item.nama_kategori}
              >
                {item.nama_kategori}
              </SelectItem>
            ))}
          </Select>
          {/* </div> */}

          <div>
            <Button color="primary" onClick={hapusSearch}>
              All Product
            </Button>
          </div>
        </div>

        <div className=" mx-2 flex gap-2 justify-around flex-wrap">
          <CardProduct />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
