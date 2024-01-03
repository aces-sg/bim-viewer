/* eslint-disable @next/next/no-img-element */
import React, { FC, useState } from "react";
import { API } from "aws-amplify";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { deleteProject } from "@/graphql/mutations";

import { CustomModal, InviteModal, ShareModal } from "./Modals";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { isBrowser } from "@/hooks/auth";

interface ProjectCardProps {
  project: any;
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
      name: "Delete",
      iconWidth: 18.3,
      iconHeight: 13.3,
      iconLink: "closeIcon",
    },
  ];

  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleMenuOption = (menuOptionId: number) => {
    if (menuOptionId === 1) {
      setShowInviteModal(true);
    }

    if (menuOptionId === 2) {
      console.log("deleting project...", project.id);
      removeProject(project.id);
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

  async function removeProject(id: string) {
    if (!isBrowser) return;
    try {
      let res = await API.graphql({
        query: deleteProject,
        variables: { input: { id } },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      console.log("success deleting project", res);
    } catch (err) {
      console.log("failed to delete project:", err);
    }
    window.location.reload();
  }

  return (
    <>
      <div>
        <div className="bg-white rounded-[8px] p-[20px] border-[1px] border-solid border-[#aaa]">
          <div className="flex items-start justify-between mb-[16px] relative">
            <h5 className="font-sans font-semibold text-[16px] leading-[24px] text-[#000] capitalize">
              {project.name}
            </h5>
            <div
              onClick={handleShowMenu}
              className="w-[20px] h-[20px] flex items-center justify-center ml-10 cursor-pointer"
            >
              <Image
                priority
                src="/images/threeDot.svg"
                width={4}
                height={16}
                alt="threeDotIcon"
              />
            </div>
            {showMenu && (
              <div
                className="bg-white absolute w-[200px] top-[35px] right-[-15px] z-50 px-[16px] py-[8px] rounded-[8px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] custom-menu"
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
          <Link href={`/projects/${project.id}`}>
            <div className="flex items-start">
              <div className="flex mr-2">
                <img
                  className="inline-block rounded-full"
                  src="/favicon.ico"
                  width={24}
                  height={24}
                  alt=""
                />
                {/* <img
                className="inline-block rounded-full"
                src="/images/user2.png"
                width={24}
                height={24}
                alt=""
              />
              <img
                className="inline-block rounded-full"
                src="/images/user3.png"
                width={24}
                height={24}
                alt=""
              />
              <img
                className="inline-block rounded-full"
                src="/images/user4.png"
                width={24}
                height={24}
                alt=""
              /> */}
              </div>
              <span className="font-sans font-normal text-[12px] leading-[18px] text-[#666] capitalize">
                {project.description}
              </span>
            </div>
          </Link>
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
