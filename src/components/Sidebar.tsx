import React from "react";
import * as OBC from "openbim-components";
export default function Sidebar() {
  const sidebarStyle: React.CSSProperties = {
    gridArea: "sidebar",
    backgroundColor: "#202932",
    borderRightColor: "#3c4854",
    borderRightWidth: "1px",
    display: "flex",
    flexDirection: "column",
    rowGap: "12px",
    justifyContent: "center",
    alignItems: "center",
  };

  const links = {
    home: "https://www.bim.com.sg",
    projects: "/projects",
  };

  return (
    <>
      <div style={sidebarStyle}>
        <a href={links.home}>
          <span className={OBC.Button.Class.Base + "material-icons"}>home</span>
        </a>
      </div>
    </>
  );
}
