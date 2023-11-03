import { FC } from "react";
import Link from "next/link";
import * as OBC from "openbim-components";

import { ViewerIcon, ProjectIcon, FolderIcon } from "./icons";

const Sidebar: FC = () => {
  // const links = {
  //   home: "https://www.bim.com.sg",
  //   projects: "/projects",
  // };

  const links = [
    { id: 1, link: "/viewers", name: "View", icon: <ViewerIcon /> },
    { id: 2, link: "/projects", name: "Projects", icon: <ProjectIcon /> },
    { id: 3, link: "/documents", name: "Files", icon: <FolderIcon /> },
  ];

  return (
    <div className="border-r-[1px] border-solid border-[#d2d2d2] bg-white">
      {links.map(linkItem => (
        <div key={linkItem.id}>
          <Link href={linkItem.link}>
            {linkItem.icon}
            <span>{linkItem.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
