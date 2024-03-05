  import React, { useState } from 'react';
  import {Link} from 'react-router-dom'
  import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
  import {
    ConnectWallet,
    useContract,
    useAddress,
    Web3Button,
    useDisconnect,
  } from '@thirdweb-dev/react';
  import CryptoJS from 'crypto-js';
  import '../styles/custom-styles.css';

  export default function WriteFir() {
    const now= new Date();
    const date=now.toLocaleDateString();
    const time=now.toLocaleTimeString();
    const [formData, setFormData] = useState({
      FIRId: '',
      subject: '',
      description: '',
      date: '',
      time: '',
      dateOfCrime: '',
      PlaceOfCrime: '',
    });

    const address = useAddress();
    const disconnect = useDisconnect();
    const { contract } = useContract('0x006dd039Fb88580A45e407764bD08053Af045c14');

    const FIRSubjects = ['Theft', 'Assault', 'Fraud', 'Harassment', 'Other'];

    const encryptData = (data, secretKey) => {
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
      return ciphertext;
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Form data submitted:', formData);
    };
    const randomId = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999



    return (
      <>
      <h1 style={{textAlign:"center"}}>File an Fir!</h1>
      <Container className="my-5 custom-container">
        <Form onSubmit={handleSubmit} className="mx-auto custom-form" style={{ border:"3px dotted #ED7D31",backgroundColor: 'white', padding: '40px',maxWidth: '600px', borderRadius: '10px' }}>
          <Row className="mb-4">
            <Col>
              <Form.Group className="mb-4">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>Fir ID:</Form.Label>
                <Form.Control type="text"  name='FIRId'  value={formData.FIRId}
                  onChange={handleChange}  className="custom-input"   style={{ border:"1px solid #ED7D31"}} />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="subject">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>Fir Subject:</Form.Label>
                <Form.Control
                  as="select"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ border:"1px solid #ED7D31"}}
                >
                  <option value="">Select Subject</option>
                  {FIRSubjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
            <Form.Group controlId="dateOfCrime">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>Date Of Crime:</Form.Label>
                <Form.Control
                  type="text"
                  name="dateOfCrime"
                  value={formData.dateOfCrime}
                  onChange={handleChange}
                  style={{ border:"1px solid #ED7D31"}}
                />
              </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="PlaceOfCrime">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>Place Of Crime:</Form.Label>
                <Form.Control
                  type="text"
                  name="PlaceOfCrime"
                  value={formData.PlaceOfCrime}
                  onChange={handleChange}
                  style={{ border:"1px solid #ED7D31"}}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col xs={12}>
            <Form.Group controlId="description">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>FIR Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{ border:"1px solid #ED7D31"}}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* <Row className="mb-4">
            <Col xs={6}>
            <Form.Group controlId="date">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>Date:</Form.Label>
                <Form.Control
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  style={{ border:"1px solid #ED7D31"}}
                />
              </Form.Group>
            </Col>
            <Col xs={6}>
            <Form.Group controlId="time">
                <Form.Label style={{ color: 'black',fontSize:'20px',fontWeight:'bolder'}}>Time:</Form.Label>
                <Form.Control
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  style={{ border:"1px solid #ED7D31"}}
                />
              </Form.Group>
            </Col>
          </Row> */}

          <Row className="mb-4">
            <Col xs={12} className="d-flex justify-content-center">
            <Web3Button
          className="web3-button-custom center-text mx-auto d-block"
          contractAddress="0x006dd039Fb88580A45e407764bD08053Af045c14"
          action={async (contract) =>
            contract.call('addFIRDetails', [
              formData.FIRId,
              encryptData(formData.subject, formData.FIRId),
              encryptData(formData.description, formData.FIRId),
              encryptData(date, formData.FIRId),
              encryptData(time, formData.FIRId),
              encryptData(formData.dateOfCrime, formData.FIRId),
              encryptData(formData.PlaceOfCrime, formData.FIRId),
            ])
          }
          onError={(error) => alert(error)}
          onSuccess={() => {
            setFormData({
              FIRId: '',
              subject: '',
              description: '',
              date: '',
              time: '',
              dateOfCrime: '',
              PlaceOfCrime: '',
            });
            alert(
              'Your Fir has been reported. You can see the Respondent in the View Fir Option'
            );
          }}
        >
          Submit data
        </Web3Button>
            </Col>
          </Row>
          <Row className="mb-4">
              <Col xs={12} className="d-flex justify-content-end">
                <Link to="/read">
                <Button style={{ backgroundColor:" #ED7D31",
      color: "#fff",border:"none"}} className='read-fir-button' variant="primary" >
                  Read FIR?
                </Button>
                </Link>
              </Col>
            </Row>
        </Form>
        
      </Container>
      </>
    );
  }
