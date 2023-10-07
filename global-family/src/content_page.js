import React, { useState } from 'react';
import './App.css';

const Tile = ({ id, onClick, isActive, text }) => {
  const tileClassName = isActive ? 'tile active' : 'tile';  
  return <div className={tileClassName} onClick={() => onClick(id)}>
    <p>{text}</p>
  </div>;
};


const ContentPage = () => {
  const [activeTiles, setActiveTiles] = useState([]);

  const handleClick = (id) => {
    console.log("hi");
    //display the respective menu
  };

  const renderTiles = () => {
    const tiles = [];
    const titles = ["Trafficking", "Wellness", "Violence Response", "Self-Love"]
    for (let i = 0; i < 4; i++) {
      const isActive = activeTiles.includes(i);
      tiles.push(<Tile key={i} id={i} onClick={handleClick} isActive={isActive} text={titles[i]}>
      </Tile>);
    }
    return tiles;
  };

  return (
    <div className="App">
      <div className="grid">{renderTiles()}</div>
    </div>
  );
};

export default ContentPage;