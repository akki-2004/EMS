import React, { useState, useEffect } from 'react';
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import CryptoJS from 'crypto-js';

export default function LatestFir() {
  const address = useAddress();
  const { contract } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");
  const { data: LatestFirs } = useContractRead(contract, 'LatestFirs');

  const decryptData = (ciphertext, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);

      if (!bytes.sigBytes) {
        console.error("Error during decryption: Decryption failed");
        return null;
      }

      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

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

  const Firs = () => {
    const latest5Firs = LatestFirs ? Object.entries(LatestFirs).slice(0, 6) : [];

    return (
      <Row xs={1} md={2} lg={3} className="g-4">
        {latest5Firs.length > 0 ? (
          latest5Firs.map(([key, value]) => (
            <Col key={key}>
              <Card style={{ marginBottom: '20px', height: '200px' }}>
                <Card.Body className="text-center d-flex flex-column justify-content-between">
                  <Card.Title className="text-center mb-3">FIR ID: {value.FIRId}</Card.Title>
                  <Card.Text className="text-center">
                    {/* Decrypt and print the description */}
                    {decryptData(value.description, value.FIRId)}
                  </Card.Text>
                  <Link to={`/fir-details/${value.FIRId}`}>
                    <Button style={{ backgroundColor: "#ED7D31", border: "none" }} variant="primary">View FIR</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No FIRs available</p>
        )}
      </Row>
    );
  };

  return (
    <div>
      <h1 style={{ marginBottom:"4%"}}className="text-center">Latest FIRs</h1>
      <Firs />
    </div>
  );
}
