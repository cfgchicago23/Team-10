import React from "react";
import './App.css';


const Login = () => {
    return (
        <div className="login">
            <h1>Global Family</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;


