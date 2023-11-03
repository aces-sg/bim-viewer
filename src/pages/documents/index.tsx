import React from "react";
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
  return (
    <>
      <div className="h-full bg-[white] px-[40px] py-[32px]">
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
          />
        </div>
        <div></div>
        <div className="grid grid-cols-4 gap-[20px]">
          {documents.map(document => (
            <DocumentCard document={document} key={document.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Documents;
