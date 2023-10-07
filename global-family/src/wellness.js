
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
const images = ["./src/images/pic1.png", "global-family/src/images/pic2.png", "global-family/src/images/pic3.png"];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Module 2: Wellness & Self-Care</h1>
      <h3 className="sub-title">Scroll through the lessons to learn more about potential resources!</h3>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: "translate(-30%, 400%)" }}>
        {/* <label style={{ marginTop: "-46%" }} className="clothing-label">Hat</label> */}
      </div>
      <div style={{ position: "relative", marginTop: "6%" }}>
        <Carousel onActiveIndexChange={setCurrentPicIndex}>
        <CarouselItem key={0}>
              <img src={photo4} alt="picture regarding basic definitions of human trafficking" className="carousel-image"/> 
              {/* <img src={"/src/images/pic1.png"} alt="this" key={0} className="resource" /> */}
            </CarouselItem>
            <CarouselItem key={1}>
            <img src={photo5} alt="picture regarding awareness of human trafficking/what to do next" className="carousel-image" />
              {/* <img src={"/src/images/pic1.png"} alt="this" key={0} className="resource" /> */}
            </CarouselItem>
          {/* {images.map((image, i) => (
            <CarouselItem key={i}>
              <img src={image} alt="this" key={i} className="resource" />
            </CarouselItem>
          ))} */}
        </Carousel>
        {/* <button onClick={addPastOutfit} className="dress-me-button">Dress Me</button> */}
      </div>
    </div>
  );
}; 

export default TraffickingPage;