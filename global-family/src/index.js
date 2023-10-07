import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD
import App from "./club";
=======
import App from "./login_page";
>>>>>>> main
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login_page";
import ContentPage from "./content_page";
import reportWebVitals from "./reportWebVitals";
import TraffickingPage from "./trafficking";
import WellnessPage from "./wellness";
import HelpPage from "./help";
import SignUpPage from "./signup_page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ContentPage" element={<ContentPage />} /> /* create a button that either directs to leader or member*/
        <Route path="/TraffickingPage" element={<TraffickingPage />} />
        <Route path="/WellnessPage" element={<WellnessPage />} />
        <Route path="/HelpPage" element={<HelpPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
