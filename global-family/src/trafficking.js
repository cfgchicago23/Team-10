
import React, { useState, Children, cloneElement } from "react";
import "./carousel.css";
import photo1 from ".//images/pic1.png";
import photo2 from ".//images/pic2.5.png";
import photo3 from ".//images/pic3.png";

const CarouselItem = ({ children, width }) => {
  return (
  <div className="carousel-item" style={{ width: width }}>
  {children}
  </div>
  );
  };
  
  
  const Carousel = ({ children, width, onActiveIndexChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  
  const updateIndex = (newIndex) => {
  if (newIndex < 0) {
  newIndex = Children.count(children) - 1;
  } else if (newIndex >= Children.count(children)) {
  newIndex = 0;
  }
  setActiveIndex(newIndex);
  onActiveIndexChange(newIndex);
  };
  
  
  return (
  <div className="carousel">
  <div
  className="inner"
  style={{ transform: `translateX(-${activeIndex * 100}%)` }}
  >
  {Children.map(children, (child, index) => {
  return cloneElement(child, { width: "100%" });
  })}
  </div>
  <div className="indicators">
  <button
  className="triangle-buttons"
  onClick={() => {
  updateIndex(activeIndex - 1);
  }}
  >
  {" "}
  {/* &#8249; */}
  <div class="triangle-buttons__triangle triangle-buttons__triangle--l"></div>
  </button>
  
  
  <button
  className="triangle-buttons"
  onClick={() => {
  updateIndex(activeIndex + 1);
  }}
  >
  {" "}
  {/* &#8250; */}
  <div class="triangle-buttons__triangle triangle-buttons__triangle--r"></div>
  </button>
  </div>
  </div>
  );
  };


  const TraffickingPage = () => {
    const [currentPicIndex, setCurrentPicIndex] = useState(0);
  
    return (
      <div style={{ padding: '40px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ textAlign: "center", color: '#FFF', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: '20px' }}>
          Module 1: Human Trafficking Awareness
        </h1>
        <h3 style={{ textAlign: "center", color: '#FFF', fontFamily: 'Arial, sans-serif', marginBottom: '40px' }}>
          Scroll through the lessons to learn more about potential resources!
        </h3>
  
        <Carousel onActiveIndexChange={setCurrentPicIndex}>
          <CarouselItem key={0}>
            <img src={photo1} alt="picture regarding basic definitions of human trafficking" className="carousel-image" />
          </CarouselItem>
          <CarouselItem key={1}>
            <img src={photo2} alt="picture regarding awareness of human trafficking/what to do next" className="carousel-image" />
          </CarouselItem>
          <CarouselItem key={2}>
            <img src={photo3} alt="picture regarding what to do next / next steps" className="carousel-image" />
          </CarouselItem>
        </Carousel>
      </div>
    );
  };

export default TraffickingPage;