import React from "react";
import { Box } from "grommet";
import BIMLOGO from "../../assets/bim_logo.svg";
import { navigate } from "gatsby";

const AuthHeader = () => {
  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      style={{ height: "40px", marginTop: 30 }}
      className="auth_container"
    >
      <BIMLOGO
        style={{ height: "60px", width: "140px", cursor: "pointer" }}
        className="logo"
        onClick={() => navigate("/")}
      />
    </Box>
  );
};

export default AuthHeader;
