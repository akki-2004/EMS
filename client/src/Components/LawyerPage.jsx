import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import HireLawyerButton from './HireALawyer';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { ConnectWallet,useAddress } from '@thirdweb-dev/react';

const LawyerList = () => {
  const weh={
    backgroundColor: "white",
    width: "40%",
    textAlign: "center",
    padding:"5%",
    display: "flex",
    flexDirection: "column", // Set to column layout
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    
  };
  
  const ewhf={
      backgroundColor:"#ED7D31",
      padding:"1.3%",
      width:"20%",
      color:"white",
      fontSize:"20px",
      fontWeight:"bold"
  }
  const fir_options={
    color:'black',
  }
  const ajfeb={
  
 
    fontSize:"20px",
    fontWeight:"bold"
}
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    specialization: 'Please select',
    court: 'Please select',
    gender: 'Please select',
  });
  const [userAcceptance, setUserAcceptance] = useState(false);
  const [advocateAcceptance, setAdvocateAcceptance] = useState(true);
  


  useEffect(() => {
    checkLoginStatus();
    fetchLawyers();
  }, []);

  const checkLoginStatus = () => {
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  };

  const fetchLawyers = async () => {
    try {
      const response = await axios.get('http://localhost:3002/lawyers');
      setLawyers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
    fetchLawyers();
  };

  const handleClickToChat = (lawyer) => {
    const whatsappUrl = `https://wa.me/${lawyer.Mobile}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleLoginClick1 = () => {
    navigate('/login');
  };

  if (!isAuthenticated ) {
    return (
      <div style={weh}>
        <p style={ajfeb}>Please log in to Hire a Lawyer.</p>
        <button style={ewhf} onClick={handleLoginClick1}>Login</button>       
      </div>
    );
  }

  const address = "0xdc116d4daEA8d4314261424D8e980bAcd67fB413";

  const filteredLawyers = lawyers.filter((lawyer) => {
    return (
      (filters.specialization === 'Please select' || lawyer.TypeofAdvocate === filters.specialization) &&
      (filters.court === 'Please select' || lawyer.TypeofCourt === filters.court) &&
      (filters.gender === 'Please select' || lawyer.Gender === filters.gender)
    );
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Container>
      <h1>Lawyers</h1>
      <Row>
        <Col md={4}>
          <Form>
            <Form.Group>
              <Form.Label>Specialization:</Form.Label>
              <Form.Control
                as="select"
                value={filters.specialization}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
              >
                <option value="Please select">Please select</option>
                <option value="Family">Family</option>
                <option value="Corporate">Corporate</option>
                <option value="Criminal">Criminal</option>
                <option value="Civil">Civil</option>
                <option value="Property">Property</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Court:</Form.Label>
              <Form.Control
                as="select"
                value={filters.court}
                onChange={(e) => handleFilterChange('court', e.target.value)}
              >
                <option value="Please select">Please select</option>
                <option value="District Court">District Court</option>
                <option value="High Court">High Court</option>
                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Gender:</Form.Label>
              <Form.Control
                as="select"
                value={filters.gender}
                onChange={(e) => handleFilterChange('gender', e.target.value)}
              >
                <option value="Please select">Please select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>

                {/* Add more options as needed */}
              </Form.Control>
            </Form.Group>
            <br />
            {isAuthenticated && (
              <ConnectWallet>
                {({ connect }) => (
                  <Button
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "none",
                      marginTop: "10px", // Add margin-top for spacing
                    }}
                    onClick={connect}
                  >
                    Connect Wallet
                  </Button>
                )}
              </ConnectWallet>
            )}

          </Form>
        </Col>
        <Col md={8}>
          <Row>
            {filteredLawyers.map((lawyer) => (
              <Col key={lawyer._id} md={6} lg={6} className="mb-3">
                <Card>
                  <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card.Title style={{ textDecoration: 'underline' }}>{lawyer.Name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{lawyer.TypeofAdvocate}</Card.Subtitle>
                    <Card.Text>
                      <p>Email: {lawyer.Email}</p>
                      <p>Court: {lawyer.TypeofCourt}</p>
                      <p>Experience: {lawyer.YearsofExperience} years</p>
                      <p>Rating: {lawyer.Ratings}</p>
                      {/* Add more fields as needed */}
                    </Card.Text>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',gap:'6%' }}>
      <Button style={{ backgroundColor: "#ED7D31", border: "none",marginRight:"2%"}} onClick={() => handleClickToChat(lawyer)}>Chat</Button>
      <HireLawyerButton
    amount="0.1"
    lawyer={lawyer.Address}
    user={() => setUserAcceptance(true)}
    accept={advocateAcceptance}
    onHireSuccess={() => alert("Hire Lawyer success")}
    onHireError={(error) => alert(`Error hiring lawyer: ${error.message}`)}
/>
      
    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LawyerList;
