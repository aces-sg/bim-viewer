import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import * as OBC from "openbim-components";

import { ViewerIcon, ProjectIcon, FolderIcon } from "./icons";

const Sidebar: FC = () => {
  const links = [
    { id: 1, link: "/", name: "View", icon: <ViewerIcon /> },
    { id: 2, link: "/projects", name: "Projects", icon: <ProjectIcon /> },
    { id: 3, link: "/documents", name: "Files", icon: <FolderIcon /> },
  ];

  return (
    <div className="border-r-[1px] border-solid border-[#d2d2d2] bg-white">
      <div className="my-[20px]">
        <Link
          href="https://www.bim.com.sg"
          className="flex flex-col items-center"
        >
          <Image
            priority
            src="/images/logoIcon.svg"
            width={68}
            height={18}
            alt="logoIcon"
            className="cursor-pointer"
          />
        </Link>
      </div>
      {links.map((linkItem, index) => (
        <div key={linkItem.id} className={index === 0 ? "m-0" : "mt-[20px]"}>
          <Link href={linkItem.link} className="flex flex-col items-center">
            <div className="w-[20px] h-[20px] mb-[8px]">{linkItem.icon}</div>
            <span className="font-sans font-semibold text-[14px] leading-[21px] text-[#666]">
              {linkItem.name}
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
