import React, { useState } from 'react';
import './App.css';
import { useEffect } from 'react';
import './trafficking';
import './wellness';
import './help';
import './resources';
import { BottomNavigation, BottomNavigationAction }  
    from "@mui/material"; 
import HomeIcon from '@mui/icons-material/House'
import LocationOnIcon from '@mui/icons-material/People'

import {useNavigate} from "react-router-dom";

import { useLocation, Link } from "react-router-dom";
import { Home } from '@mui/icons-material';
const Tile = ({ id, onClick, isActive, text, index }) => {
  const tileClassName = isActive ? 'tile active' : 'tile';  
  return <div className={tileClassName} onClick={() => onClick(id, index)}>
    <p>{text}</p>


</div>;
};




const ContentPage = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [activeTiles, setActiveTiles] = useState([]);
  const titles = ["Trafficking", "Wellness", "Ask for Help", "More Resources"]
  const handleClick = (id, index) => {
    console.log("hi");
    if(index === 0){
        navigate("/TraffickingPage");
    }else if(index === 1){
        navigate("/WellnessPage");
    }else if(index === 2){
        navigate("/HelpPage");
    }else{
      window.open("https://www.stjamesresearchcentre.org/courses", "_blank");
  
    }


//display the respective menu
};

  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < 4; i++) {
      const isActive = activeTiles.includes(i);
      tiles.push(<Tile key={i} id={i} onClick={handleClick} index ={i} isActive={isActive} text={titles[i]}>
      </Tile>);
    }
    return tiles;
  };

  return (
    <div className="App">
      <div className="grid">{renderTiles()}</div>
      <BottomNavigation 
                value={value} 
                onChange={(e, newValue) => { 
                    setValue(newValue); 
                }} 
            > 
                <BottomNavigationAction label="Home"
                    icon={<HomeIcon />} /> 
                <BottomNavigationAction label="Clubs"
                    icon={<LocationOnIcon />} /> 
            </BottomNavigation>
    </div>
  );
};
// return <h1>Hello</h1>;

// return (
//   <div className="App">
//     <div className="grid">{renderTiles()}</div>
//   </div>
// );
// };

export default ContentPage;
