import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Headerr = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Typography variant="h4">A12 Songs App</Typography>
        <Button
          variant="contained"
          sx={{ backgroundColor: "red" }}
          onClick={() => {
            navigate("../");
          }}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};
