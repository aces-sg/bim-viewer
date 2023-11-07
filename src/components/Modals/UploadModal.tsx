import React, { FC } from "react";
import Image from "next/image";

import { useOutsideClick } from "@/hooks/useOutsideClick";

interface UploadModalProps {
  type: string;
  closeModal: () => void;
}

const UploadModal: FC<UploadModalProps> = ({ type, closeModal }) => {
  const handleUpload = () => {
    console.log("handleUpload::");
  };

  const modalRef = useOutsideClick(() => {
    closeModal();
  });

  return (
    <div className="w-[500px]" ref={modalRef}>
      <div className="bg-[#fddb00] flex items-center justify-between px-[20px] py-[18px]">
        <div className="flex items-center">
          <Image
            priority
            src={`/images/uploadIcon.svg`}
            width={23.8}
            height={17.3}
            alt="uploadIcon"
            className="mr-[16px]"
          />
          <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
            Upload {type}
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
        <div className="flex items-center justify-center w-full mb-[20px]">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <button
          className="w-full h-[56px] text-center bg-[#fddb00] rounded-full font-sans font-semibold text-[16px] leading-[24px] text-[#121212]"
          onClick={handleUpload}
        >
          Upload {type}
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
