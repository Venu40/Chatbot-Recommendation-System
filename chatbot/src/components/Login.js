import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CardContainer = styled(Card)({
  maxWidth: 500,
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const CardContentBox = styled(CardContent)({
  width: "60%",
  display: "flex",
  flexDirection: "column",
  gap: 20,
  // alignItems: "center",
});

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (name) => (event) => {
    console.log("name", event.target.value);
    console.log(values);
    setValues({ ...values, [name]: event.target.value });
  };
  const handleSubmit = async () => {
    console.log(values);
    try {
      const response = await axios.post("http://localhost:5000/login", {
        user: values,
      });
      console.log(response);
      if (response.data == "Not Found") alert("Invalid Credentials");
      else if (response.data == "unsuccessful") alert("password is wrong");
      else {
        navigate("/chat");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardContainer elevation={5}>
      <CardContentBox>
        <Typography variant="h4">Login</Typography>
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
      <CardActions sx={{ marginBottom: 5 }}>
        <Button
          variant="contained"
          sx={{ width: "130px" }}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </CardActions>
      <Typography>
        Don't have an Account? <Link to="/signup">Create Account</Link>
      </Typography>
    </CardContainer>
  );
};

export default Login;
