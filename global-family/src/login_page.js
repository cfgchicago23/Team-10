import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, CssBaseline, Box } from '@mui/material';
import { motion } from 'framer-motion';
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
    // e.preventDefault();
    // console.log("in handlesubmit");
    // const account = users.find((user) => user.username === username);
    // if (account && account.password === password) {
    //   // put into the database that this person logged in
    //   console.log(" in");
    //   localStorage.setItem("authenticated", true);
    //   console.log(" in1");
    //   navigate("/ContentPage");
    //   console.log(" in2");
    //   //   setLogged(Math.random());
    // }
    var xhr = new XMLHttpRequest();
    var url = "http://127.0.0.1:3000/api/signup";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var json = JSON.parse(xhr.responseText);
        console.log(json.email + ", " + json.password);
      }
    };
    var data = JSON.stringify({
      email: email,
      password: password,
    });
    xhr.send(data);

    if (xhr.status === 200) {
      navigate("/ContentPage");
    } else {
      alert("Incorrect username or password");
    }

    e.preventDefault();
    console.log("in handlesubmit");
    navigate("/Login");
  };

  return (
    <Container style={{ marginTop: '0', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', padding: '40px', borderRadius: '0', position: 'relative', height: '100vh' }}>
      <CssBaseline />
      <Typography variant="h2" style={{ color: '#FFF', position: 'absolute', top: '10px', center: '10px', fontFamily: 'times new roman' }}>
        Thrive
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
        <Typography variant="h4" gutterBottom style={{ color: '#FFF', textAlign: 'center', fontFamily: 'sans-serif' }}>
          Please log in
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '20px', background: '#FFF' }}
          />
          <TextField 
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            style={{ marginBottom: '20px', background: '#FFF' }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </form>
        <Typography variant="h6" gutterBottom style={{ marginTop: '20px', color: '#FFF', textAlign: 'center', fontFamily: 'sans-serif' }}>
          Don't have an account?
        </Typography>
        <Button variant="outlined" color="secondary" onClick={() => navigate("/SignUp")} fullWidth>
          Sign Up
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
