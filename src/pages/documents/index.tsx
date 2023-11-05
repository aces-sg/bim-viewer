import React, { useState } from "react";
import Image from "next/image";

import DocumentCard from "@/components/DocumentCard";
import CommentsBox from "@/components/CommentsBox";

const documents = [
  { id: 1, name: "Document 2023" },
  { id: 2, name: "Document 2022" },
  { id: 3, name: "Document 2021" },
  { id: 4, name: "Document 2020" },
  { id: 5, name: "Pictures" },
  { id: 6, name: "Applications" },
  { id: 7, name: "Financial Report" },
  { id: 8, name: "Agent Report" },
];

const Documents = () => {
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  return (
    <>
      <div className="min-h-full bg-white px-[10px] md:px-[20px] lg:px-[40px] py-[32px]">
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
            All Folders
          </h5>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {documents.map(document => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
      </div>
      {showCommentsBox && <CommentsBox closeBox={closeCommentsBox} />}
    </>
  );
};

export default Documents;
