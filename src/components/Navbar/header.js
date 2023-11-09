import React from "react";

const headerData = () => {
  return {
    navlinks: [
      {
        id: 1,
        label: "Home",
        href: "/",
      },
    ],
    miscl: [
      {
        id: 1,
        label: "Home",
        href: process.env.GATSBY_HOME_URL,
      },
    ],
  };
};

export default headerData;
