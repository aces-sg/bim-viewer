import React, { FC } from "react";
import Link from "next/link";
import LeftArrowIcon from "./icons/LeftArrowIcon";

const Navbar: FC = () => {
  return (
    <div className="bg-white px-[40px] py-[17.5px]">
      <Link href="https://www.bim.com.sg">
        <LeftArrowIcon />
        <span>Back To Homepage</span>
      </Link>
      <div className=""></div>
    </div>
  );
};

export default Navbar;
