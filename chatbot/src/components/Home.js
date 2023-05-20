import { Card, Container, Box, Grid, Typography } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";
const Home = () => {
  return (
    <>
      <Grid
        container
        sx={{
          height: "100vh",
          backgroundImage: `url(https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=740&t=st=1684224737~exp=1684225337~hmac=8128723c261c3ad3d516d5093188811221b5fbf776871f044aedc11ed73a7785)`,
          // backgroundSize: "cover",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={5}>
          <Typography variant="h4" color="white">
            Welcome to{" "}
          </Typography>
          <Typography variant="h2" color="white">
            A12 songs App
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Login />
        </Grid>
      </Grid>
    </>
  );
};
export default Home;
