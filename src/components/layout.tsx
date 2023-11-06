import React, { FC, useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import useWindowDimensions from "@/hooks/useWindowDimesions";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  const [showSidebar, setShowSidebar] = useState(true);

  const sidebarRef = useOutsideClick(() => {
    if (width && width > 768) return;
    console.log("aaa::");
    setShowSidebar(false);
  });

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  useEffect(() => {
    if (width && width >= 768) {
      handleShowSidebar();
    }
  }, [width]);

  return (
    <div
      id="app"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {showSidebar && (
        <div ref={sidebarRef}>
          <Sidebar />
        </div>
      )}
      <div className="ml-0 md:ml-[100px]">
        <Navbar handleShowSidebar={handleShowSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
