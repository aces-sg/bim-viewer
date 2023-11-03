import React, { FC } from "react";
import { Document } from "@/types";
import Image from "next/image";

interface DocuemtnCardProps {
  document: Document;
}

const DocumentCard: FC<DocuemtnCardProps> = ({ document }) => {
  return (
    <div className="bg-[#f2f2f2] rounded-[8px] p-[20px] border-[1px] border-solid border-[#aaa] flex items-center justify-between">
      <div className="flex items-center">
        <Image
          priority
          src="/images/folderIcon.svg"
          width={20}
          height={16}
          alt="threeDotIcon"
          className="cursor-pointer mr-2"
        />
        <h5 className="font-sans font-normal text-[16px] leading-[24px] text-[#000] capitalize">
          {document.name}
        </h5>
      </div>
      <Image
        priority
        src="/images/threeDot.svg"
        width={4}
        height={16}
        alt="threeDotIcon"
        className="cursor-pointer ml-10"
      />
    </div>
  );
};

export default DocumentCard;
