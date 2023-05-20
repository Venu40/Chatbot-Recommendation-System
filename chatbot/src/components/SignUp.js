import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  styled,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CardContainer = styled(Card)({
  minWidth: 400,
  margin: "auto",
  // marginTop: 40,
  // padding: 40,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: 10,
});

const CardContentBox = styled(CardContent)({
  // width: "80%",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  alignItems: "center",
});

const SignUp = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (name) => (event) => {
    console.log("name", event.target.value);
    console.log(values);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        user: values,
      });
      setOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        padding: 0,
        backgroundImage:
          "url(https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?w=740&t=st=1684224936~exp=1684225536~hmac=b0a06d19c463174dee010537980d7d08e3df2016bf98309d3dd588738256dd1f)",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CardContainer elevation={5}>
        <CardContentBox>
          <Typography variant="h4">SignUp</Typography>
          <TextField
            label="name"
            fullWidth
            onChange={handleChange("username")}
          ></TextField>
          <TextField
            label="email"
            fullWidth
            onChange={handleChange("email")}
          ></TextField>

          <TextField
            label="password"
            fullWidth
            onChange={handleChange("password")}
          ></TextField>
        </CardContentBox>
        <CardActions>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </CardActions>
      </CardContainer>
      <Dialog open={open}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>New Account Successfully Created</DialogContent>
        <DialogActions>
          <Link to="../">
            <Typography>Sign In</Typography>
          </Link>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SignUp;
