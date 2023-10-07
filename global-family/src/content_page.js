import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import "./trafficking";
import "./wellness";
import "./help";
import "./resources";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/People";
import { Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { useLocation, Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
const Tile = ({ id, onClick, isActive, text, index }) => {
  const tileClassName = isActive ? "tile active" : "tile";
  return (
    <div className={tileClassName} onClick={() => onClick(id, index)}>
      <p>{text}</p>
    </div>
  );
};

const ContentPage = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [activeTiles, setActiveTiles] = useState([]);
  const titles = ["Trafficking", "Wellness", "Ask for Help", "More Resources"];
  const handleClick = (id, index) => {
    console.log("hi");
    if (index === 0) {
      navigate("/TraffickingPage");
    } else if (index === 1) {
      navigate("/WellnessPage");
    } else if (index === 2) {
      navigate("/HelpPage");
    } else {
      window.open("https://www.stjamesresearchcentre.org/courses", "_blank");
    }

    //display the respective menu
  };

  const Tile = ({ id, onClick, isActive, text, index }) => {
    const tileClassName = isActive ? "tile active" : "tile";
    return (
      <div className={tileClassName} onClick={() => onClick(id, index)}>
        <p>{text}</p>
      </div>
    );
  };

  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < 4; i++) {
      const isActive = activeTiles.includes(i);
      tiles.push(
        <Tile
          key={i}
          id={i}
          onClick={handleClick}
          index={i}
          isActive={isActive}
          text={titles[i]}
        ></Tile>
      );
    }
    return tiles;
  };
  const [userType, setUserType] = useState(null); // Initialize state to hold user_type
  useEffect(() => {
    fetch("https://api.npms.io/v2/search?q=react")
      .then((response) => response.json())
      .then((data) => setUserType(data.type))
      .catch((error) => console.error("Error fetching user_type:", error));
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      // Navigate to the home screen or component
      // You can use a routing library like React Router to handle navigation
      navigate("/content_page");
    } else if (newValue === 1) {
      // Navigate to the club screen or component
      // fetch("https://api.npms.io/v2/search?q=react")
      //   .then((response) => response.json())
      //   .then((data) => this.setState({ totalReactPackages: data.type }));
      if (userType === "Club Leader") {
        navigate("/club");
        // navigate("/spaces_page");
      } else {
        navigate("/user");
      }
    }
    // Navigate to the selected value
  };
  return (
    <div className="App">
      <Typography variant="h1" className="thrive-title">
        Thrive
      </Typography>
      <div className="grid">{renderTiles()}</div>
      <BottomNavigation
        className="custom-bottom-navigation"
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Clubs" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default ContentPage;
