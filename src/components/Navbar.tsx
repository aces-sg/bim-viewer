import React, { FC, useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut } from "./Auth/auth";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { LeftArrowIcon, MenuIcon } from "./icons";
import { urls } from "./Auth/data";

interface NavbarProps {
  handleShowSidebar: () => void;
}

const Navbar: FC<NavbarProps> = ({ handleShowSidebar }) => {
  const menus = [
    { id: 1, name: "Account", iconWidth: 13.5, iconLink: "userAccountIcon" },
    { id: 2, name: "Logout", iconWidth: 15, iconLink: "logoutIcon" },
  ];
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleMenuOption = async (menuOptionId: number) => {
    if (menuOptionId === 1) {
      router.push("/account");
    } else if (menuOptionId === 2) {
      // Assuming 2 is the ID for logout
      try {
        let res = await Auth.currentAuthenticatedUser();
        console.log("Successfully logged out", res);
        // Redirect to the sign-in page or homepage after logout
      } catch (error) {
        console.error("Error signing out: ", error);
      }
      router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
    }
    if (menuOptionId === 2) {
      signOut();
    }
    setShowMenu(false);
  };

  const menuRef = useOutsideClick(() => {
    setShowMenu(false);
  });

  const handleBack = () => {
    if (router.pathname === `${urls.homePage}`) {
      return;
    }
    router.back();
  };

  return (
    <div className="bg-white px-[10px] md:px-[20px] lg:px-[40px] py-[8px] flex items-center justify-between border-b-[1px] border-solid border-[#d2d2d2] relative">
      <div className="flex items-center">
        <div
          className="md:hidden lg:hidden mr-[16px]"
          onClick={handleShowSidebar}
        >
          <MenuIcon />
        </div>
        <Link href={`${urls.homePage}`} className="flex items-center">
          <LeftArrowIcon />
          <span className="ml-2 font-sans font-normal text-[14px] leading-[21px] text-[#666]">
            Back To Homepage
          </span>
        </Link>
      </div>
      <div
        className="bg-[#fddb00] w-[40px] h-[40px] flex items-center justify-center rounded-full font-sans font-semibold text-[14px] leading-[21px] text-[#000] cursor-pointer"
        onClick={handleShowMenu}
      >
        An
      </div>
      {showMenu && (
        <div
          className="bg-white absolute w-[200px] top-[60px] right-[40px] z-50 px-[16px] py-[8px] rounded-[8px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] custom-menu"
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
