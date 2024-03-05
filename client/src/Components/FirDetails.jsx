import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useContract, useContractRead } from "@thirdweb-dev/react";
import CryptoJS from 'crypto-js';
// import { Dropdown, Button,Modal } from 'react-bootstrap';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';


const FIRDetailsPage = () => {
  // console.log(req.body)
  const { id } = useParams();
  const { contract, error: contractError } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");

  const { data: firDetails } = useContractRead(contract, 'getFIRDetails', [id]);


  const decryptData = (ciphertext, secretKey) => {
    try {
      if (!ciphertext || !secretKey) {
        console.error("Error during decryption: Ciphertext or secretKey is undefined");
        return null;
      }
  
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  
      // Check if decryption was successful
      if (!bytes.sigBytes) {
        console.error("Error during decryption: Decryption failed");
        return null;
      }
  
      // Parse the decrypted data
      const decryptedDataString = bytes.toString(CryptoJS.enc.Utf8);
  
      // Check if decryptedDataString is not empty
      if (!decryptedDataString.trim()) {
        console.error("Error during decryption: Decrypted data is empty");
        return null;
      }
  
      // Parse the decrypted data as JSON
      const decryptedData = JSON.parse(decryptedDataString);
  
      // Check if decryptedData is undefined or null
      if (!decryptedData) {
        console.error("Error during decryption: Decrypted data is undefined or null");
        return null;
      }
  
      return decryptedData;
    } catch (error) {
      console.error("Error during decryption:", error.message);
      return null;
    }
  };
  

  const handleTickButtonClick = async () => {
    try {
      console.log('Sending firId to server:', id);

      // Assuming you have a server endpoint to handle the tick operation
      const response = await axios.post(`http://localhost:3002/tick`, { firid: id });
      alert('Fir Accepted successfully ');
      console.log('Tick response:', response.data);
      
      // You may want to update the firDetails state or handle it according to your logic
    } catch (error) {
      console.error('Error during tick operation:', error);
    }
  };

  const handleCrossButtonClick = async () => {
    try {
      console.log('Sending firId to server:', id);

      // Assuming you have a server endpoint to handle the cross operation
      const response = await axios.post(`http://localhost:3002/cross`, { firid: id });
      
      console.log('Cross response:', response.data);
      alert('Fir Rejected successfully ');
      
      // You may want to update the firDetails state or handle it according to your logic
    } catch (error) {
      console.error('Error during cross operation:', error);
    }
    
  };
  // const [showModal, setShowModal] = useState(true);

 


  const customcard ={
    width: "100%",
  
    margin: "auto"
  }
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ maxHeight: '100vh' }}>
    <Row>
      <Col >
        {contractError && <p>Error initializing contract: {contractError.message}</p>}
        {firDetails ? (
          <Card style={{ height: '400px' }} className="d-flex flex-column justify-content-between">
            <Card.Body >
              <Card.Title style={{ marginBottom:"5%"}}className="text-center">FIR Details</Card.Title>
              <Card.Text>
                <p>Case Name: {decryptData(firDetails.subject, id)}</p>
                <p>Description: {decryptData(firDetails.description, id)}</p>
                <p>DateofCrime: {decryptData(firDetails._dateOfCrime, id)}</p>
                <p>PlaceOfCrime: {decryptData(firDetails._PlaceOfCrime, id)}</p>
                {/* <p>Description: {decryptData(firDetails.description, id)}</p> */}

                {/* Additional FIR details go here */}
              </Card.Text>
              <Button onClick={handleTickButtonClick} style={{ marginRight: '5%' }} >Accept FIR✅</Button>
              <Button onClick={handleCrossButtonClick}>Reject FIR❌</Button>
            </Card.Body>
          </Card>
        ) : (
          <p>Loading FIR details...</p>
        )}
      </Col>
    </Row>
  </Container>
  );
};

export default FIRDetailsPage;
