import React from "react";
import Link from "next/link";
import * as OBC from "openbim-components";

type Props = {};

const Sidebar: React.FC<Props> = () => {
  // const links = {
  //   home: "https://www.bim.com.sg",
  //   projects: "/projects",
  // };

  const links = [
    { id: 1, link: "/viewers", name: "View" },
    { id: 2, link: "/projects", name: "Projects" },
    { id: 3, link: "/files", name: "Files" },
  ];

  return (
    <div>
      {links.map(linkItem => (
        <div key={linkItem.id}>
          <Link href={linkItem.link}>
            <span>{linkItem.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
