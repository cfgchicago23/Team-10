import React, { useState, Children, cloneElement } from "react";
import "./carousel.css";
import photo4 from ".//images/pic4.png";
import photo5 from ".//images/pic5.5.png";

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
          <div class="triangle-buttons__triangle triangle-buttons__triangle--l"></div>
        </button>
        <button
          className="triangle-buttons"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <div class="triangle-buttons__triangle triangle-buttons__triangle--r"></div>
        </button>
      </div>
    </div>
  );
};

const WellnessPage = () => {
  const [currentPicIndex, setCurrentPicIndex] = useState(0);

  return (
    <div style={{ padding: '40px', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ textAlign: "center", color: '#FFF', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', marginBottom: '20px' }}>
        Module 2: Wellness & Self-Care
      </h1>
      <h3 style={{ textAlign: "center", color: '#FFF', fontFamily: 'Arial, sans-serif', marginBottom: '40px' }}>
        Scroll through the lessons to learn more about potential resources!
      </h3>

      <Carousel onActiveIndexChange={setCurrentPicIndex}>
        <CarouselItem key={0}>
          <img src={photo4} alt="picture regarding wellness and self-care" className="carousel-image" />
        </CarouselItem>
        <CarouselItem key={1}>
          <img src={photo5} alt="picture regarding wellness and self-care" className="carousel-image" />
        </CarouselItem>
      </Carousel>
    </div>
  );
};

export default WellnessPage;
