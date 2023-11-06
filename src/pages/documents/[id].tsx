import React, { useState } from "react";
import Image from "next/image";

import CommentsBox from "@/components/CommentsBox";
import DocumentTree from "@/components/DocumentTree";

import { DocumentTreeItem } from "@/types";

const documentData: DocumentTreeItem[] = [
  {
    id: "1",
    name: "Folder1",
    type: "folder",
    children: [
      {
        id: "1-1",
        name: "Folder1-1",
        type: "folder",
        children: [
          {
            id: "1-1-1",
            name: "Folder(1-1) - File1",
            type: "file",
          },
          {
            id: "1-3",
            name: "Folder(1-1) - File2",
            type: "file",
          },
        ],
      },
      {
        id: "1-2",
        name: "Folder1-2",
        type: "folder",
        children: [],
      },
      {
        id: "1-3",
        name: "Folder1 - File1",
        type: "file",
      },
    ],
  },
  {
    id: "2",
    name: "Folder2",
    type: "folder",
    children: [
      {
        id: "2-1",
        name: "Folder2-1",
        type: "folder",
        children: [],
      },
      {
        id: "2-2",
        name: "Folder2 - File1",
        type: "file",
      },
    ],
  },
  {
    id: "3",
    name: "Folder3",
    type: "folder",
    children: [
      {
        id: "3-1",
        name: "Folder3-1",
        type: "folder",
        children: [],
      },
      {
        id: "3-2",
        name: "Folder3 - File1",
        type: "file",
      },
      {
        id: "3-3",
        name: "Folder3 - File2",
        type: "file",
      },
    ],
  },
];

const DocumentDetail = () => {
  const [showCommentsBox, setShowCommentsBox] = useState(false);

  const closeCommentsBox = () => {
    setShowCommentsBox(false);
  };

  return (
    <>
      <div className="bg-white px-[15px] md:px-[20px] lg:px-[40px] py-[32px]">
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
        <div className="">
          {documentData.map(documentItem => (
            <DocumentTree
              document={documentItem}
              key={documentItem.id}
              level={0}
            />
          ))}
        </div>
      </div>
      {showCommentsBox && <CommentsBox closeBox={closeCommentsBox} />}
    </>
  );
};

export default DocumentDetail;
