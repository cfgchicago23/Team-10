import { useState } from "react";
// import ContentPage from "./content_page";
import { useNavigate } from "react-router-dom";
// import Dashboard from "./Dashboard";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "Jane", password: "test" }];
  //   const [logged, setLogged] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handlesubmit");
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      // put into the database that this person logged in
      console.log(" in");
      localStorage.setItem("authenticated", true);
      console.log(" in1");
      navigate("/ContentPage");
      console.log(" in2");
      //   setLogged(Math.random());
    }
  };

  //   useEffect(() => {
  //     navigate("/ContentPage");
  //   }, [logged]);

  return (
    <div>
      <h3>Please log in</h3>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          name="Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>

      {/* if you don't have an account, sign up */}
      <br />
      <p>Don't have an account?</p>
      <button onClick={() => navigate("/SignUp")}>Sign Up</button>
    </div>
  );
};

export default Login;
