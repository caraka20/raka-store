import React, { useState } from "react";
import axiosInstance from "../../config/api";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const nav = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [input, setInput] = useState({
    email_user: "",
    password: "",
  });
  const [dataRegist, setDataRegist] = useState({
    nama_user: "",
    email_user: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      // Memeriksa apakah email dan password tidak kosong
      if (!input.email_user || !input.password) {
        toast.error("Email dan password harus diisi");
        return;
      }

      const res = await axiosInstance.get(
        `/auth/login?email_user=${input.email_user}&password=${input.password}`
      );
      toast.success(res.data.message);
      Cookies.set("user_token", res.data.data.jwt);
      Cookies.set("role", res.data.data.role);
      setTimeout(() => {
        if (res.data.data.role === "customer") {
          nav("/");
        } else {
          nav("/dashboard");
        }
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleRegister = async (e) => {
    try {
      if (
        !dataRegist.nama_user ||
        !dataRegist.email_user ||
        !dataRegist.password
      ) {
        toast.error("Semua field harus diisi");
        return;
      }

      const res = await axiosInstance.post("/auth/register", dataRegist);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleChangeRegister = async (e) => {
    try {
      const newInput = { ...dataRegist };
      newInput[e.target.name] = e.target.value;
      setDataRegist(newInput);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const newInput = { ...input };
    newInput[e.target.name] = e.target.value;
    setInput(newInput);
  };

  const toggleForm = (value) => {
    setIsRegister(value);
  };

  return (
    <div className="w-full h-screen flex bg-[#5359c4] justify-center items-center">
      <Toaster />
      <div className="w-full flex justify-center px-4 flex-col items-center ">
        <div className="m-auto w-full grid mx-[10px] rounded-sm border-1 border-white overflow-auto grid-cols-2 font-bold max-w-[504px] mb-4">
          <button
            className={`py-2 text-white focus:outline-none ${
              isRegister ? "bg-gray-700" : "bg-pink-500"
            }`}
            onClick={() => toggleForm(false)}
          >
            MASUK
          </button>
          <button
            className={`py-2 text-white focus:outline-none ${
              isRegister ? "bg-pink-500" : "bg-gray-700"
            }`}
            onClick={() => toggleForm(true)}
          >
            DAFTAR
          </button>
        </div>
        {isRegister ? (
          <section className="flex flex-col items-center justify-center w-full max-w-[504px]  p-6 border-1 border-white m-auto bg-slate-100 rounded-md shadow-md dark:bg-gray-800">
            <h1 className="text-xl text-center font-semibold text-gray-700 capitalize dark:text-white">
              DAFTAR
            </h1>
            <div className="grid  w-full gap-6 mt-4">
              <div className="w-full">
                <label className="dark:text-gray-200" htmlFor="username">
                  Nama Lengkap
                </label>
                <input
                  onChange={handleChangeRegister}
                  name="nama_user"
                  value={dataRegist.nama_user}
                  id="username"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Username
                </label>
                <input
                  name="email_user"
                  value={dataRegist.email_user}
                  onChange={handleChangeRegister}
                  id="emailAddress"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  name="password"
                  value={dataRegist.password}
                  onChange={handleChangeRegister}
                  id="password"
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleRegister}
                className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              >
                Daftar
              </button>
            </div>
          </section>
        ) : (
          <section className="flex flex-col bg-slate-100 items-center justify-center w-full max-w-[504px]  p-6  border-1 border-white  rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-xl text-center font-semibold text-gray-700 capitalize dark:text-white">
              MASUK
            </h2>
            <div className="grid bg-slate-100 w-full gap-6 mt-4">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="emailAddress"
                >
                  Username
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="email_user"
                  value={input.email_user}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  name="password"
                  value={input.password}
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleLogin}
                className="px-6 py-2 leading-5 bg-pink-500 text-white transition-colors duration-200 transform rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Masuk
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
