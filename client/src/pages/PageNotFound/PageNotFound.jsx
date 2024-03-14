import React from "react";
import PageInfo from "../../components/PageInfo/PageInfo";
import TabBar from "../../components/TabBar/TabBar";
import notFound from "./../../assets/404pagenotfound.png";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
const PageNotFound = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }
  return (
    <div className=" m-auto">

      <div className="flex flex-col items-center mt-[-100px]  w-full">
        <div className="w-full flex justify-center">
          <img className="w-[500px] h-[500px]" src={notFound} alt="" />
        </div>
        <h1 className="text-[36px] text-[#191C1F] text-center">
          404, Page Not Found
        </h1>
        <h1 className="text-[16px] text-[#475156] text-center w-[28%] py-[24px]">
          Something went wrong. It’s look that your requested could not be
          found. It’s look like the link is broken or the page is removed.
        </h1>
        <div className="flex gap-5">
          <button onClick={handleGoBack} className="h-[48px] text-white bg-primaryOrange w-[141px] flex justify-center items-center gap-3 font-bold text-[14px] rounded-sm">
            <AiOutlineArrowLeft className="text-xl"  /> GO BACK
          </button>
          <button onClick={() => navigate("/")} className="h-[48px]  bg-white border-2 border-primaryOrange text-primaryOrange w-[141px] flex justify-center items-center gap-3 font-bold text-[14px] rounded-sm mb-[20px]">
            <AiOutlineHome className="text-xl" /> GO HOME
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
