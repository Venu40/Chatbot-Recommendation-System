import { Typography } from "@mui/material";
export const Footer = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f0e9df",
        backgroundColor: "#141926",
        color: "white",
        gap: "10px",
        padding: "10px",
      }}
    >
      <Typography variant="h5">Done By:</Typography>
      <Typography>2451-19-733-015</Typography>
      <Typography>2451-19-733-016</Typography>
      <Typography>2451-19-733-018</Typography>
    </div>
  );
};
