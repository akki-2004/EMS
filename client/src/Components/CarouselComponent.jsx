import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import image12 from "../images/WhatsApp Image 2024-01-30 at 15.20.15_3bb5eb19.jpg";
import image13 from "../images/evidence_cap.jpg";
import image14 from "../images/AdobeStock_125329788-1080x675.jpeg";

const CarouselComponent = () => {
    const imgStyle = {
        width: "100%",
        height: "700px", // Set your desired fixed height here
        objectFit: "cover",
      };
  return (
    <Carousel interval={2000}> 
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image12}
          alt="First slide"
        //   style={{ maxHeight: "800px" }}
         // Set your desired height here
         style={imgStyle}
        />
        <Carousel.Caption>
          <h3 style={{color:"black"}}>File an FIR?</h3>
          <p>Text for Image 1</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image13}
          alt="Second slide"
          style={imgStyle} // Set your desired height here
        />
        <Carousel.Caption>
          <h3 style={{color:"black"}}>A Best place to store Evidence!</h3>
          <p>Text for Image 2</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image14}
          alt="Third slide"
          style={imgStyle} // Set your desired height here
        />
        <Carousel.Caption>
          <h3 style={{color:"black"}}>Want to hire a Lawyer?</h3>
          <p>Text for Image 3</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
