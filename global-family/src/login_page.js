import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Container, Typography, CssBaseline, Box } from '@mui/material';
import { motion } from 'framer-motion';
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "Jane", password: "test" }];

  const handleSubmit = (e) => {
    e.preventDefault();
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      localStorage.setItem("authenticated", true);
      navigate("/ContentPage");
    }
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
            label="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
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
