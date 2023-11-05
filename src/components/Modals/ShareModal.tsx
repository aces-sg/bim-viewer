import React, { FC } from "react";
import Image from "next/image";

interface ShareModalProps {
  closeModal: () => void;
}

const ShareModal: FC<ShareModalProps> = ({ closeModal }) => {
  const handleInvitePeople = () => {
    closeModal();
  };

  return (
    <div className="w-[500px]">
      <div className="bg-[#fddb00] flex items-center justify-between px-[20px] py-[18px]">
        <div className="flex items-center">
          <Image
            priority
            src={`/images/shareIcon.svg`}
            width={23.8}
            height={17.3}
            alt="shareIcon"
            className="mr-[16px]"
          />
          <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
            Share With
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
        <div className="">
          <p className="font-sans font-normal text-[16px] leading-[24px] text-[#000] mb-[8px]">
            Email
          </p>
          <div className="mb-[16px]">
            <input
              type="text"
              className="rounded-[8px] p-[10px] border-[1px] border-solid border-[#aaa] w-full h-[44px]"
              placeholder="Email, Comma Separated"
            />
          </div>
        </div>
        <button
          className="w-full h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212]"
          onClick={handleInvitePeople}
        >
          Share With
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
