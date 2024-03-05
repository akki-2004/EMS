import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useAuth } from '../AuthContext';
import "../styles/App.css"

function Login() {
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let user_captcha_value = document.getElementById('user_captcha_input').value;

    if (validateCaptcha(user_captcha_value)) {
      axios
        .post('http://localhost:3002/login', formData)
        .then((result) => {
          console.log(result);
          if (result.data === 'Success') {
            login();
            navigate('/');
          }
        })
        .catch(err => {
          if (err.response && err.response.data && err.response.data.error) {
            alert(err.response.data.error);
          } else {
            console.error(err.response);
          }
        });
    } else {
      alert('Invalid Captcha');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
      <div className="form1" style={{ backgroundColor: '#ED7D3  3', padding: '30px', borderRadius: '8px' }}>
        <h1 className="form_title text-center">Log In</h1>
        <Form style={{border:"5px solid #ED7D31", backgroundColor: 'white', padding: '40px', borderRadius: '10px' }}onSubmit={handleSubmit} className="login-form">
          <h1 className='form-title'>Login</h1>
          <Form.Group controlId="loginId">
            <Form.Label className='form-input'>Login ID:</Form.Label>
            <Form.Control
              type="text"
              name="loginId"
              value={formData.loginId}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label className='form-input'>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </Form.Group>
<br/>
          <LoadCanvasTemplate />

          <Form.Group controlId="captcha">
          <Form.Label cclassName="captcha-form">Captcha</Form.Label>
            <Form.Control
              type="text"
              id="user_captcha_input"
              placeholder=""
              autoComplete="off"
              onChange={handleChange}
            />
         
          </Form.Group>
          <br/>

          <Button style={{ backgroundColor:" #ED7D31",
    color: "#fff",border:"none"}}type="submit" id="login-btn">
            Log In
          </Button>
        </Form>
        {/* <Link to="/forgotpassword" className="">
          forgot password?
        </Link> */}
      </div>
    </Container>
  );
}

export default Login;
