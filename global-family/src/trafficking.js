
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
const images = ["./src/images/pic1.png", "global-family/src/images/pic2.png", "global-family/src/images/pic3.png"];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Module 1: Human Trafficking Awareness</h1>
      <h3 className="sub-title">Scroll through the lessons to learn more about potential resources!</h3>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: "translate(-30%, 400%)" }}>
        {/* <label style={{ marginTop: "-46%" }} className="clothing-label">Hat</label> */}
      </div>
      <div style={{ position: "relative", marginTop: "6%" }}>
        <Carousel onActiveIndexChange={setCurrentPicIndex}>
        <CarouselItem key={0}>
              <img src={photo1} alt="picture regarding basic definitions of human trafficking" className="carousel-image"/> 
              {/* <img src={"/src/images/pic1.png"} alt="this" key={0} className="resource" /> */}
            </CarouselItem>
            <CarouselItem key={1}>
            <img src={photo2} alt="picture regarding awareness of human trafficking/what to do next" className="carousel-image" />
              {/* <img src={"/src/images/pic1.png"} alt="this" key={0} className="resource" /> */}
            </CarouselItem>
            <CarouselItem key={2}>
            <img src={photo3} alt="picture regarding what to do next / next steps" className="carousel-image"/>
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