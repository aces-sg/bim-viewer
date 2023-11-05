import React, { useState } from "react";
import Image from "next/image";

import CommentsBox from "@/components/CommentsBox";

const DocumentDetail = () => {
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  return (
    <>
      <div className="h-full bg-white px-[10px] md:px-[20px] lg:px-[40px] px-[40px] py-[32px]">
        <div className="flex items-center justify-between mb-[32px]">
          <button className="flex items-center justify-center w-[200px] bg-[#fddb00] rounded-full p-[8px] cursor-pointer font-sans font-semibold text-[16px] leading-[24px] text-[#000]">
            <Image
              priority
              src="/images/plusIcon.svg"
              width={14}
              height={14}
              alt="PlusIcon"
              className="mr-2"
            />
            <span>Add</span>
          </button>
          <Image
            priority
            src="/images/chatIcon.svg"
            width={40}
            height={40}
            alt="ChatIcon"
            className="cursor-pointer"
            onClick={() => setShowCommentsBox(true)}
          />
        </div>
        <div className="flex items-center mb-[16px]">
          <Image
            priority
            src="/images/yellowFolderIcon.svg"
            width={23.3}
            height={18.6}
            alt="yellowFolderIcon"
            className="mr-[16px]"
          />
          <h5 className="font-sans font-semibold text-[20px] leading-[30px] text-[#121212]">
            Document 2023
          </h5>
        </div>
      </div>
      {showCommentsBox && <CommentsBox closeBox={closeCommentsBox} />}
    </>
  );
};

export default DocumentDetail;
