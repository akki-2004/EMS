import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  const linkStyle = {
    textDecoration: 'none',
    
    color:"black" // Remove underline
  };
  const dkufg={
    fontWeight:"bold",
  }

  return (
    <div className="text-muted">
      <Container className="text-center text-md-start mt-5">
        <Row className="mt-3 justify-content-between">
          <Col md={6} lg={5} xl={4} mb={4}>
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="fas fa-gem me-3" ></i>Evitech
            </h6>
            <p >
              A place where you can register an FIR online.
              Do you have a case in Court and want to hire an Advocate,
              you came to the right place, here we even provide a service
              where you can hire an advocate.
            </p>
          </Col>
          <Col md={5} lg={4} xl={3} mb={4}>
            <h6 className="text-uppercase fw-bold mb-4">
              Useful links
            </h6>
            <p>
              <Link to="/fir" style={linkStyle}>File An FIR</Link>
            </p>
            <p>
              <Link to="/evidence" style={linkStyle}>Evidence Management</Link>
            </p>
            <p>
              <Link to="/lawyer" style={linkStyle}>Hire A Lawyer</Link>
            </p>
            <p>
              <Link to="/" style={linkStyle}>Help</Link>
            </p>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-4">
        © 2023 Copyright: EviTech.
      </div>
    </div>
  );
}
