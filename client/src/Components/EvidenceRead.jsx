import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal,Row,Container } from 'react-bootstrap';
import {
  useContract,
  useContractRead,
} from '@thirdweb-dev/react';
import CryptoJS from 'crypto-js';

const EvidenceRead = () => {
  const [checkCnr, setCheckCnr] = useState('');
  const [foundData, setFoundData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  const { contract } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");
  const { data: contractData, isLoading, error } = useContractRead(
    contract,
    'getDataByCNR',
    [checkCnr]
  );

  const decryptData = (ciphertext, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);

      if (!bytes.sigBytes) {
        console.error('Error during decryption: Decryption failed');
        return null;
      }

      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedString;
    } catch (error) {
      console.error('Error during decryption:', error.message);
      return null;
    }
  };

  const handleShowModal = () => {
    if (contractData) {
      const decryptedData = contractData.map((element) =>
        element.map((item) => decryptData(item.trim(), checkCnr))
      );
      setFoundData(decryptedData);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
        <Container >
        <Row className="justify-content-center mt-5">
      <h1  style={{textAlign:"center"}}>Reading the Data by CNR!</h1>
      <br />  
        <br />  
        <br />  

        <br />  

      <Card style={{ height: "400px", width: "100%" ,border:"3px dotted #ED7D31"}}>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title>Enter CNR to Check Data</Card.Title>
          
          <Form>
            <Form.Group controlId="checkCnr">
              <Form.Label>Enter CNR:</Form.Label>
              <Form.Control
                type="text"
                value={checkCnr}
                onChange={(e) => setCheckCnr(e.target.value)}
                style={{ border: "2px solid #ED7D31" }}
              />
            </Form.Group>
            <br />
            <Button  style={{ backgroundColor: "#ED7D31", border: "none" }} variant="primary" onClick={handleShowModal}>
              Check Data
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Your Found Data</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {foundData ? (
  <ul>
    {foundData.map((arrayData, index) => (
      <li key={index}>
        <strong>{index + 1}:</strong>{' '}
        {arrayData.map((element, innerIndex) => (
          <p key={innerIndex}>
            {element !== null && element !== undefined && element.trim
              ? `${element.trim()}`
              : 'N/A'}
          </p>
        ))}
      </li>
    ))}
  </ul>
) : (
  <p>No data available</p>
)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </>
  );
};

export default EvidenceRead;
