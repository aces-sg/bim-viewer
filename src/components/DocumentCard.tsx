import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { CustomModal, UploadModal } from "./Modals";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { Document } from "@/types";

interface DocuemtnCardProps {
  document: Document;
}

const DocumentCard: FC<DocuemtnCardProps> = ({ document }) => {
  const menus = [
    {
      id: 1,
      name: "Upload File",
      iconWidth: 15.5,
      iconHeight: 19.5,
      iconLink: "fileIcon",
    },
    {
      id: 2,
      name: "Upload Folder",
      iconWidth: 20,
      iconHeight: 16,
      iconLink: "folderIcon",
    },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const [showUploadFolderModal, setShowUploadFolderModal] = useState(false);

  const menuRef = useOutsideClick(() => {
    setShowMenu(false);
  });

  const handleShowMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(true);
  };

  const handleMenuOption = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    menuOptionId: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (menuOptionId === 1) {
      setShowUploadFileModal(true);
    } else {
      setShowUploadFolderModal(true);
    }
    setShowMenu(false);
  };

  const handleCloseUploadFileModal = () => {
    setShowUploadFileModal(false);
  };

  const handleCloseUploadFolderModal = () => {
    setShowUploadFolderModal(false);
  };

  return (
    <>
      <Link href={`/documents/${document.id}`}>
        <div className="bg-[#f2f2f2] rounded-[8px] p-[20px] border-[1px] border-solid border-[#aaa] flex items-center justify-between relative">
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
          <div
            onClick={e => handleShowMenu(e)}
            className="w-[20px] h-[20px] flex items-center justify-center"
          >
            <Image
              priority
              src="/images/threeDot.svg"
              width={4}
              height={16}
              alt="threeDotIcon"
              className="cursor-pointer"
            />
          </div>
          {showMenu && (
            <div
              className="bg-white absolute w-[200px] top-[55px] right-[10px] z-50 px-[16px] py-[8px] rounded-[8px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] custom-menu"
              ref={menuRef}
            >
              {menus.map((menu, index) => (
                <div
                  className="flex items-center h-[37px] cursor-pointer"
                  key={index}
                  onClick={e => handleMenuOption(e, menu.id)}
                >
                  <div className="w-[20px] h-[20px] flex items-center justify-center">
                    <Image
                      priority
                      src={`/images/${menu.iconLink}.svg`}
                      width={menu.iconWidth}
                      height={menu.iconHeight}
                      alt={menu.iconLink}
                      className="cursor-pointer"
                    />
                  </div>
                  <span className="ml-2 font-sans font-normal text-[14px] leading-[21px] text-[#121212]">
                    {menu.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
      {showUploadFileModal && (
        <CustomModal>
          <UploadModal type="File" closeModal={handleCloseUploadFileModal} />
        </CustomModal>
      )}
      {showUploadFolderModal && (
        <CustomModal>
          <UploadModal
            type="Folder"
            closeModal={handleCloseUploadFolderModal}
          />
        </CustomModal>
      )}
    </>
  );
};

export default DocumentCard;
