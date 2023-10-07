import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login_page";
import ContentPage from "./content_page";

const App = () => {
  return (
    <Login />
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/content" element={<ContentPage />} />
    //   </Routes>
    // </Router>
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/ContentPage" element={<ContentPage />} />
    //   </Routes>
    // </Router>
  );
};

export default App;
