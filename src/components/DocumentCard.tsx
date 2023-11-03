import React, { FC } from "react";
import { Document } from "@/types";

interface DocuemtnCardProps {
  document: Document;
}

const DocumentCard: FC<DocuemtnCardProps> = ({ document }) => {
  return <div className="">Document card</div>;
};

export default DocumentCard;
