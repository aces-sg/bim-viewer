import React, { FC } from "react";
import Image from "next/image";

import { DocumentTreeItem } from "@/types";

interface DocumentTreeProps {
  level: number;
  document: DocumentTreeItem;
}

const DocumentTree: FC<DocumentTreeProps> = ({ document, level }) => {
  return (
    <>
      <div
        className="flex items-center mb-[16px]"
        style={{ paddingLeft: `${16 * level}px` }}
      >
        <div className="w-[24px] h-[24px] flex items-center justify-center mr-[16px]">
          <Image
            priority
            // src={`/images/${
            //   document.type === "file" ? "fileIcon" : "folderIcon"
            // }.svg`}
            src={`/images/fileIcon.svg`}
            width={document.type === "file" ? 16 : 20}
            height={24}
            alt="FileIcon"
          />
        </div>
        <span>{document.name}</span>
      </div>
      {document.children &&
        document.children.map(documentItem => (
          <DocumentTree
            document={documentItem}
            key={documentItem.id}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default DocumentTree;
