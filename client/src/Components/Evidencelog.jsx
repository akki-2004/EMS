import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Evidencelog() {
  const [formData, setFormData] = useState({
    cnr: '',
    loginId: '',
    password: '',
  });

  const FIRSubjects = ['Lab Technician', 'Forensic', 'Lawyer', 'Police'];
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3002/cnr', formData)
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          navigate('/evidence');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="my-5 custom-container">
      <Form
        style={{
          border: '5px solid #ED7D31',
          backgroundColor: 'white',
          padding: '40px',
          maxWidth: '800px',
          borderRadius: '10px',
        }}
        onSubmit={handleSubmit}
      >
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <br />
        {/* CNR input */}
        <Form.Group className="mb-4">
          <Form.Label>Enter CNR:</Form.Label>
          <Form.Control
            type="text"
            name="cnr"
            value={formData.cnr}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Username input */}
        <Form.Group className="mb-4">
          <Form.Label>Enter Username:</Form.Label>
          <Form.Control
            type="text"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
          />
        </Form.Group>

        {/* FIR Subject dropdown */}
        <Form.Group controlId="subject">
          <Form.Label style={{ color: 'black', fontSize: '20px', fontWeight: 'bolder' }}>
            FIR Subject:
          </Form.Label>
          <Form.Control
            as="select"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={{ border: '2px solid #ED7D31' }}
          >
            <option value="">Select Subject</option>
            {FIRSubjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Password input */}
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Sign-in Button */}
        <Button
          type="submit"
          style={{ backgroundColor: '#ED7D31', color: '#fff', border: 'none' }}
          variant="primary"
          className="btn-block mb-4"
        >
          Sign in
        </Button>
      </Form>
    </Container>
  );
}