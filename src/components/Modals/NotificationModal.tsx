import React, { FC } from "react";
import Image from "next/image";

import { useOutsideClick } from "@/hooks/useOutsideClick";

export interface NotificationModalProps {
  type: boolean;
  message: string;
  closeModal: () => void;
}

const NotificationModal: FC<NotificationModalProps> = ({
  message,
  closeModal,
}) => {
  const handleOk = () => {
    closeModal();
  };

  const modalRef = useOutsideClick(() => {
    closeModal();
  });

  return (
    <div className="w-[400px]" ref={modalRef}>
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
        <Image
          priority
          src={`/images/closeIcon.svg`}
          width={11}
          height={11}
          alt="closeIcon"
          className="cursor-pointer"
          onClick={closeModal}
        />
      </div>
      <div className="bg-white p-[20px]">
        <div>{message || "N.A."}</div>
        <div className="flex flex-row items-center justify-end w-full mb-[20px]">
          <button
            className="w-40 mt-4 h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212]"
            onClick={handleOk}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
