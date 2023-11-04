import React, { FC } from "react";
import Image from "next/image";

interface InviteModalProps {
  closeModal: () => void;
}

const InviteModal: FC<InviteModalProps> = ({ closeModal }) => {
  const handleInvitePeople = () => {
    closeModal();
  };

  return (
    <div className="w-[500px]">
      <div className="bg-[#fddb00] flex items-center justify-between px-[20px] py-[18px]">
        <div className="flex items-center">
          <Image
            priority
            src={`/images/plusUserIcon.svg`}
            width={23.8}
            height={17.3}
            alt="plusUserIcon"
            className="mr-[16px]"
          />
          <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
            Invite People
          </h5>
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
        <button
          className="w-full h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212]"
          onClick={handleInvitePeople}
        >
          Invite People
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
