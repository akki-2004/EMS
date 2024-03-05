// import React ,{useEffect,useState}from 'react'
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom'; 
// import axios from 'axios'; // Import axios

// export default function Policelog() {
//   const [formData, setFormData] = useState({
//     loginId: '',
//     password: '',
//     idNumber: '',
//     policeStation: '',
//     designation: ''
//   });

//   const navigate = useNavigate();
//   axios.defaults.withCredentials=true;


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//         .post('http://localhost:3002/firdetails', formData)
//         .then((result) => {
//           console.log(result);
//           if (result.data === 'Success') {
//             navigate('/home');
//           }
//         })
//         .catch((err) => console.log(err));
//   };

//     const FIRSubjects = ['Lab Technician', 'Forensic', 'Lawyer', 'Police'];
//   return (
//     <Container className="my-5 custom-container">

//     <Form onSubmit={handleSubmit} style={{border:"5px solid #ED7D31", backgroundColor: 'white', padding: '40px',maxWidth: '800px', borderRadius: '10px' }}>
//         <h1 style={{textAlign:"cemter"}}>Login</h1>
//         <br/>
//       {/* Email input */}
//       <Form.Group controlId="loginId">
//           <Form.Label>Login ID:</Form.Label>
//           <Form.Control
//             type="text"
//             name="loginId"
//             value={formData.loginId}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="password">
//           <Form.Label>Password:</Form.Label>
//           <Form.Control
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="idNumber">
//           <Form.Label>Police ID (Number):</Form.Label>
//           <Form.Control
//             type="text"
//             name="idNumber"
//             value={formData.idNumber}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="policeStation">
//           <Form.Label>Police Station:</Form.Label>
//           <Form.Control
//             type="text"
//             name="policeStation"
//             value={formData.policeStation}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

//         <Form.Group controlId="designation">
//           <Form.Label>Designation:</Form.Label>
//           <Form.Control
//             type="text"
//             name="designation"
//             value={formData.designation}
//             onChange={handleChange}
//             required
//           />
//         </Form.Group>

 
//       {/* Password input */}
    
//       <Button style={{ backgroundColor:" #ED7D31",
//     color: "#fff",border:"none"}} variant="primary" type="button" className="btn-block mb-4">
//           Sign in
//         </Button>
 
//     </Form>
//   </Container>
//   )
// }
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

const PoliceInformationForm = () => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
    idNumber: '',
    policeStation: '',
    designation: ''
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3002/firdetails', formData)
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          navigate('/book');
        }
      })
       .catch(err => {
          if (err.response && err.response.data && err.response.data.error) {
            alert(err.response.data.error);
          } else {
            console.error(err.response);
          }
        });
  };

  return (
    <Container  className="my-5 custom-container">
      {/* <h2>Police Information Form</h2> */}

      <Form onSubmit={handleSubmit} style={{border:"5px solid #ED7D31", backgroundColor: 'white', padding: '40px',maxWidth: '800px', borderRadius: '10px' }}>
      <h1 style={{textAlign:"cemter"}}>Login</h1>
        <Form.Group controlId="loginId">
          <Form.Label>Login ID:</Form.Label>
          <Form.Control
            type="text"
            name="loginId"
            value={formData.loginId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="idNumber">
          <Form.Label>Police ID (Number):</Form.Label>
          <Form.Control
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="policeStation">
          <Form.Label>Police Station:</Form.Label>
          <Form.Control
            type="text"
            name="policeStation"
            value={formData.policeStation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="designation">
          <Form.Label>Designation:</Form.Label>
          <Form.Control
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          style={{ backgroundColor:" #ED7D31",
             color: "#fff",border:"none"}} 
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default PoliceInformationForm;
