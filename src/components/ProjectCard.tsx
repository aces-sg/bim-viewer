import React, { FC, useState } from "react";
import Image from "next/image";

import { CustomModal, InviteModal, ShareModal } from "./Modals";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const menus = [
    {
      id: 1,
      name: "Invite",
      iconWidth: 18.3,
      iconHeight: 13.3,
      iconLink: "inviteIcon",
    },
    {
      id: 2,
      name: "Share",
      iconWidth: 15,
      iconHeight: 16.7,
      iconLink: "shareIcon",
    },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleMenuOption = (menuOptionId: number) => {
    if (menuOptionId === 1) {
      setShowInviteModal(true);
    } else {
      setShowShareModal(true);
    }
    setShowMenu(false);
  };

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const menuRef = useOutsideClick(() => {
    setShowMenu(false);
  });

  const handleCloseInviteModal = () => {
    setShowInviteModal(false);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-[8px] p-[20px] border-[1px] border-solid border-[#aaa]">
        <div className="flex items-start justify-between mb-[16px] relative">
          <h5 className="font-sans font-semibold text-[16px] leading-[24px] text-[#000] capitalize">
            {project.title}
          </h5>
          <div
            onClick={handleShowMenu}
            className="w-[20px] h-[20px] flex items-center justify-center"
          >
            <Image
              priority
              src="/images/threeDot.svg"
              width={4}
              height={16}
              alt="threeDotIcon"
              className="cursor-pointer ml-10"
            />
          </div>
          {showMenu && (
            <div
              className="bg-white absolute w-[200px] top-[25px] right-[0px] z-50 px-[16px] py-[8px] rounded-[8px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]"
              ref={menuRef}
            >
              {menus.map((menu, index) => (
                <div
                  className="flex items-center h-[37px] cursor-pointer"
                  key={index}
                  onClick={() => handleMenuOption(menu.id)}
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
        <div className="flex">
          <p className="font-sans font-normal text-[12px] leading-[18px] text-[#666] capitalize">
            {project.description}
          </p>
        </div>
      </div>
      {showInviteModal && (
        <CustomModal>
          <InviteModal closeModal={handleCloseInviteModal} />
        </CustomModal>
      )}
      {showShareModal && (
        <CustomModal>
          <ShareModal closeModal={handleCloseShareModal} />
        </CustomModal>
      )}
    </>
  );
};

export default ProjectCard;
