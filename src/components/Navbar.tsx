import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import LeftArrowIcon from "./icons/LeftArrowIcon";

const Navbar: FC = () => {
  const menus = [
    { id: 1, name: "Account", iconWidth: 13.5, iconLink: "userAccountIcon" },
    { id: 2, name: "Logout", iconWidth: 15, iconLink: "logoutIcon" },
  ];
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleMenuOption = (menuOptionId: number) => {
    if (menuOptionId === 1) {
      console.log("handle account");
      router.push("/account");
    } else {
      console.log("handle logout");
    }
    setShowMenu(false);
  };

  const menuRef = useOutsideClick(() => {
    setShowMenu(false);
  });

  return (
    <div className="bg-white px-[40px] py-[8px] flex items-center justify-between border-b-[1px] border-solid border-[#d2d2d2] relative">
      <Link href="https://www.bim.com.sg" className="flex items-center">
        <LeftArrowIcon />
        <span className="ml-2 font-sans font-normal text-[14px] leading-[21px] text-[#666]">
          Back To Homepage
        </span>
      </Link>
      <div
        className="bg-[#fddb00] w-[40px] h-[40px] flex items-center justify-center rounded-full font-sans font-semibold text-[14px] leading-[21px] text-[#000] cursor-pointer"
        onClick={handleShowMenu}
      >
        AN
      </div>
      {showMenu && (
        <div
          className="bg-white absolute w-[200px] top-[60px] right-[40px] z-50 px-[16px] py-[8px] rounded-[8px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]"
          ref={menuRef}
        >
          {menus.map((menu, index) => (
            <div
              className="flex items-center h-[37px] cursor-pointer"
              key={index}
              onClick={() => handleMenuOption(menu.id)}
            >
              <Image
                priority
                src={`/images/${menu.iconLink}.svg`}
                width={menu.iconWidth}
                height={13.5}
                alt={menu.iconLink}
                className="cursor-pointer"
              />
              <span className="ml-2 font-sans font-normal text-[14px] leading-[21px] text-[#121212]">
                {menu.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
