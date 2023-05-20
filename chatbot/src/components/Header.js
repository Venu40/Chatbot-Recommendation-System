import React from "react";
import { ReactDOM } from "react-dom/client";
import { Typography } from "@mui/material";
export const Header = () => {
  return (
    <Typography
      variant="h4"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // color: "white",

        // backgroundColor: "black",
        height: "80px",
      }}
    >
      A12 Songs App
    </Typography>
  );
};
