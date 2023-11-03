import React, { FC } from "react";
import Link from "next/link";
import LeftArrowIcon from "./icons/LeftArrowIcon";

const Navbar: FC = () => {
  return (
    <div className="bg-white px-[40px] py-[8px] flex items-center justify-between">
      <Link href="https://www.bim.com.sg" className="flex items-center">
        <LeftArrowIcon />
        <span className="ml-2 font-sans font-normal text-[14px] leading-[21px] text-[#666]">
          Back To Homepage
        </span>
      </Link>
      <div className="bg-[#fddb00] w-[40px] h-[40px] flex items-center justify-center rounded-full font-sans font-semibold text-[14px] leading-[21px] text-[#000] cursor-pointer">
        AN
      </div>
    </div>
  );
};

export default Navbar;
