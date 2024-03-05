// Main.js
import React from "react";
import "../styles/Main.css";
import image2 from "../images/WhatsApp Image 2024-01-30 at 15.20.15_3bb5eb19.jpg";
import image3 from "../images/evidence_cap.jpg";
import { Container, Row, Col, Button } from "react-bootstrap";
import image4 from "../images/AdobeStock_125329788-1080x675.jpeg";
import { Link } from "react-router-dom";
import Footer from "./Footer";
// import img2 from "../images/—Pngtree—3d judge gavel hammer auction_13029219.png"
import CarouselComponent from "./CarouselComponent";
import { useAuth } from '../AuthContext';

export default function Main() {
  const { isAuthenticated,user } = useAuth();
    const imgStyle = {
        width: "100%",
        height: "400px", // Set your desired fixed height here
        // objectFit: "cover",
      };
      const getButtonLabel = () => {
        return isAuthenticated ? 'Get Started' : 'Learn More';
      };
      // console.log('User:', user); // Log user information
  return (
    <>
     <Container className="text-center mx-auto my-5">
      <CarouselComponent />
    </Container>
    <Container>
      <h1 className="hi">What Exactly Do we Provide?</h1>

      <Row className="card-container">
        {/* First Row */}
        <Col xs={12} md={6} className="mb-md-5">
          <img src={image2} alt="Image 1"  style={imgStyle} />
        </Col>
        <Col xs={12} md={6}>
        <div className="img-text text-center">
            <h2 className="fjeb">File An FIR</h2>
            <p>
              We help people to come and register an FIR online. With this, it
              becomes easy to register an FIR without going to a police
              station. Anyone can register the FIR anywhere anytime.
            </p>
            
            <Link to="/fir">
            <Button className="custom-button" style={{ border: 'none', backgroundColor: '#ED7D31'}}>{getButtonLabel()}</Button>
              </Link>
          </div>
        </Col>

        {/* Second Row */}
        <Col xs={12} md={6 }  className="mb-md-5">
        <div className="img-text text-center ">
            <h2 className="fjeb">Hire An Advocate</h2>
            <p>
              We help people to come and hire a lawyer for their case. According
              to the type and seriousness of the case, we have different types of
              advocates.
            </p>
            <Link to="/lawyer">
            <Button className="custom-button" style={{ border: 'none',backgroundColor: '#ED7D31'}}>{getButtonLabel()} </Button>
              </Link>
          </div>
        </Col>
        <Col xs={12} md={6}>
        <img src={image4} alt="Image 2"  style={imgStyle} />
        </Col>

        {/* Third Row */}
        <Col xs={12} md={6} className="mb-md-5 ">
          <img src={image3} alt="Image 3"  style={imgStyle} />
        </Col>
        <Col xs={12} md={6}>
        <div className="img-text text-center ">
            <h2 className="fjeb">Evidence Management</h2>
            <p>
              We store every minute detail of various cases all across Telangana.
              This makes it easier for the investigative officers to solve the
              case, and we even have a copy of everything. Government officers can
              come and view any case anytime.
            </p>
            <Link to="/evlog">
            <Button className="custom-button" style={{ border: 'none',backgroundColor: '#ED7D31'}}>{getButtonLabel()}</Button>
              </Link>
          </div>
        </Col>
      </Row>


      <hr />
    </Container>
<Footer/>

    </>
   
  );
}

