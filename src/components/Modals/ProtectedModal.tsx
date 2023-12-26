import React, { FC, useContext } from "react";
import Image from "next/image";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import { urls } from "../Auth/data";
import { isLoggedIn } from "../Auth/auth";
import { AuthContext } from "../Auth/authContext";

export interface ProtectedModalProps {
  type: boolean;
  message: string;
  closeModal?: () => void;
}

const ProtectedModal: FC<ProtectedModalProps> = ({ message }) => {
  const router = useRouter();
  const handleOk = () => {
    router.push(`${process.env.NEXT_PUBLIC_LOGIN_URL}`);
  };

  return (
    <div className="w-[400px]">
      <div className="bg-[#fddb00] flex items-center justify-between px-[20px] py-[18px]">
        <div className="flex items-center">
          <Image
            priority
            src={`/images/notificationIcon.svg`}
            width={23.8}
            height={17.3}
            alt="uploadIcon"
            className="mr-[16px]"
          />
        </div>
      </div>
      <div className="bg-white p-[20px]">
        <div>{message || "N.A."}</div>
        <div className="flex flex-row items-center justify-end w-full mb-[20px]">
          <button
            className="w-40 mt-4 h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212]"
            onClick={handleOk}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtectedModal;
