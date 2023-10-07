import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "Jane", password: "test" }];

  const handleSubmit = (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch("http://127.0.0.1:8000/api/login", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          // Navigate to the content page
          navigate("/ContentPage");
        } else {
          // Display an alert for incorrect username or password
          alert("Incorrect username or password");
        }
        // return response.json();
      })
      .then((data) => {
        // If needed, handle the response data here
        console.log(data);
      })
      .catch((error) => {
        // Handle any fetch errors here
        console.error("Error:", error);
      });

    e.preventDefault();
    console.log("in handlesubmit");
    navigate("/Login");
  };

  return (
    <Container
      style={{
        marginTop: "0",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        padding: "40px",
        borderRadius: "0",
        position: "relative",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <Typography
        variant="h2"
        style={{
          color: "#FFF",
          position: "absolute",
          top: "10px",
          center: "10px",
          fontFamily: "times new roman",
        }}
        className="hide-when-small"
      >
        Thrive
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{
            color: "#FFF",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
          className="please-login"
        >
          Please log in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "20px", background: "#FFF" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            style={{ marginBottom: "20px", background: "#FFF" }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            marginTop: "20px",
            color: "#FFF",
            textAlign: "center",
            fontFamily: "sans-serif",
          }}
        >
          Don't have an account?
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/SignUp")}
          fullWidth
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
