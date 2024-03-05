import React, { useState } from "react";
import { Card, Form, Button, Container, Row, Modal } from "react-bootstrap";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import CryptoJS from "crypto-js";

const ReadFir = () => {
  const [findId, setFindId] = useState("");
  const [firData, setFirData] = useState(null);
  const [data, setData] = useState({
    FIRId: "",
    subject: "",
    description: "",
    date: "",
    time: "",
    dateOfCrime: "",
    PlaceOfCrime: "",
  });
  const [showModal, setShowModal] = useState(false);

  const { contract } = useContract(
    "0x006dd039Fb88580A45e407764bD08053Af045c14"
  );

  const {
    data: fir,
    isLoading: firLoading,
    error: firError,
  } = useContractRead(contract, "getFIRDetails", [findId]);
  const decryptData = (ciphertext, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);

      if (!bytes.sigBytes) {
        console.error("Error during decryption: Decryption failed");
        return null;
      }

      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if (!decryptedData) {
        console.error(
          "Error during decryption: Decrypted data is undefined or null"
        );
        return null;
      }

      return decryptedData;
    } catch (error) {
      console.error("Error during decryption:", error.message);
      return null;
    }
  };

  const handleShowData = () => {
    // Fetch data only when the button is clicked
console.log(decryptData(fir.dateOfCrime, findId));
console.log(fir);
console.log('Decrypted dateOfCrime:', decryptData(fir.dateOfCrime, findId));
console.log('Decrypted PlaceOfCrime:', decryptData(fir.PlaceOfCrime, findId));

    if (findId) {
      setData({
        FIRId: fir.FIRId,
        subject: decryptData(fir.subject, findId),
        description: decryptData(fir.description, findId),
        date: decryptData(fir.date, findId),
        time: decryptData(fir.time, findId),
        dateOfCrime: decryptData(fir._dateOfCrime, findId),
        PlaceOfCrime: decryptData(fir._PlaceOfCrime, findId),
      });
      setShowModal(true);
    }
  };
// console.log(decryptData(fir.dateOfCrime, findId));
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container >
      <Row className="justify-content-center mt-5">
        {/* Input Form */}
        <h1 style={{textAlign:"center"}}>ReCheck Your FIR!</h1>
        <br />  
        <br />  
        <br />  

        <br />  


        <Card style={{ height: "400px", width: "80%" ,border:"3px dotted #ED7D31"}}>
          <Card.Body className="d-flex flex-column justify-content-center align-items-center">
            <Card.Title>Add FIRId to check your FIR</Card.Title>
            <br />    
            <Form>
              <Form.Group controlId="FIRId">
                <Form.Label>Enter Your FIRId:</Form.Label>
                <Form.Control
                  type="text"
                  name="FIRId"
                  value={findId}
                  onChange={(e) => setFindId(e.target.value)}
                  style={{ border: "2px solid #ED7D31" }}
                />
              </Form.Group>
              <br />
              <Button
                style={{ backgroundColor: "#ED7D31", border: "none" }}
                onClick={handleShowData}
              >
                Show data
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>

      {/* Result Display */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your FIR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {fir && findId ? (
    <>
      <p>Subject: {data.subject || "No data available"}</p>
      <p>Description: {data.description || "No data available"}</p>
      <p>Date Of Crime: {data.dateOfCrime || "No data available"}</p>
      <p>Place Of Crime: {data.PlaceOfCrime || "No data available"}</p>
      <p>Date Of FIR: {data.date || "No data available"}</p>
    </>
  ) : (
    <p>No FIR data available</p>
  )}
</Modal.Body>

      </Modal>
    </Container>
  );
};

export default ReadFir;
