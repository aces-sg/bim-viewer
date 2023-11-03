import React, { FC } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div
      id="app"
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        gridTemplateAreas: "'sidebar viewer'",
      }}
    >
      <Sidebar />
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
