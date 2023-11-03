import React from "react";
import * as OBC from "openbim-components";
const Sidebar = () => {
  const links = {
    home: "https://www.bim.com.sg",
    projects: "/projects",
  };

  return (
    <div>
      <a href={links.home}>
        <span className={OBC.Button.Class.Base + "material-icons"}>home</span>
      </a>
    </div>
  );
};

export default Sidebar;
