import { useState } from "react";
// import ContentPage from "./content_page";
import { useNavigate } from "react-router-dom";
// import Dashboard from "./Dashboard";
import { useEffect } from "react";
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [authenticated, setauthenticated] = useState(
    localStorage.getItem(localStorage.getItem("authenticated") || false)
  );
  const users = [{ username: "Jane", password: "test" }];
  //   const [logged, setLogged] = useState(null);
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

  //   useEffect(() => {
  //     navigate("/ContentPage");
  //   }, [logged]);

  return (
    <div>
      <h3 className="sign-in-message">Please log in</h3>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
