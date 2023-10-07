import React, { useState } from 'react';
import './App.css';

const Tile = ({ id, onClick, isActive }) => {
  const tileClassName = isActive ? 'tile active' : 'tile';
  return <div className={tileClassName} onClick={() => onClick(id)} />;
};

const ContentPage = () => {
  const [activeTiles, setActiveTiles] = useState([]);

  const handleClick = (id) => {
    setActiveTiles((prevActiveTiles) =>
      prevActiveTiles.includes(id)
        ? prevActiveTiles.filter((tileId) => tileId !== id)
        : [...prevActiveTiles, id]
    );
  };

  const renderTiles = () => {
    const tiles = [];
    for (let i = 0; i < 16; i++) {
      const isActive = activeTiles.includes(i);
      tiles.push(<Tile key={i} id={i} onClick={handleClick} isActive={isActive} />);
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