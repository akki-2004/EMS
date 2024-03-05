
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Signup() {
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    //userId: '657b002569149af8fb4a325e',
    Name: '',
    email: '',
    mobileNo: '',
    dob: '',
    gender: '',
    city: '',
    state: '',
    district: '',
    pincode: '',
    loginId: '',
    password: '',
    confirmPassword: '',
    securityA1: '',
    securityA2: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3002/register', formData)
      .then(result => {
        console.log(result);
        login();
        navigate('/');
      })
      .catch(err => {
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error);
        } else {
          console.error(err.response);
        }
      });
  };

  const handleGoogleSignIn = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);

    axios.post('http://localhost:3002/google-signin', { googleData: credentialResponseDecoded })  // <-- Add the trailing slash
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };




  return (
    <html>
      <head>
        <title>Signup Page</title>
        <style>
          {`
            body {
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif; 
            }
            h1 {
              color: black;
              font-family: Georgia;
              font-size: 300%;
              text-align: center;
            }
            .form1 {
              margin-left: 38%;
              justify-content: center;
              align-items: center;
            }
            .heading {
              color: black;
              font-family: Arial;
              font-size: 100%;
              text-align: left;
            }
            form {
              width: 300px;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 8px;
              font-size: 16px;
            }
            input, select, textarea {
              width: 100%;
              margin-bottom: 10px;
              padding: 8px;
              box-sizing: border-box;
              font-size: 16px; 
            }
            .terms {
              margin-left: 38%;
              justify-content: center;
              align-items: center;
              font-size: larger;
            }
          `}
        </style>
      </head>
      <body>
        <h1>Signup: Citizen</h1>

        <div className="form1">
          <h1 className="heading">Personal Details</h1>
          <form onSubmit={handleSubmit} className="form">
            Name: <input type="text" name="Name" value={formData.Name} onChange={handleChange} required pattern="[A-Za-z\s]+" maxLength="15" /><br />
            Email ID: <input type="email" name="email" value={formData.email} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" /><br />
            Mobile no.: <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required maxLength="10" /><br />
            DOB: <input type="date" name="dob" value={formData.dob} onChange={handleChange} required max="2005-04-09" /><br />
            Gender: 
            Male: <input type="radio" name="gender" value="male" onChange={handleChange} />
            Female: <input type="radio" name="gender" value="female" onChange={handleChange} />
            Other: <input type="radio" name="gender" value="other" onChange={handleChange} /><br />
           
          </form>
        </div>

        <div className="form1">
          <h1 className="heading">Address details</h1>
          <form onSubmit={handleSubmit} className="form">
            City: <input type="text" name="city" value={formData.city} onChange={handleChange} required pattern="[A-Za-z\s]+" /><br />
            State: <input type="text" name="state" value={formData.state} onChange={handleChange} required pattern="[A-Za-z\s]+" /><br />
            District: <input type="text" name="district" value={formData.district} onChange={handleChange} required pattern="[A-Za-z\s]+" /><br />
            Pincode: <input type="number" name="pincode" value={formData.pincode} onChange={handleChange} required maxLength="6" /><br />
            
          </form>
        </div>

        <div className="form1">
          <h1 className="heading">Login credentials</h1>
          <form onSubmit={handleSubmit} className="form">
            Login id: <input type="text" name="loginId" value={formData.loginId} onChange={handleChange} required pattern="(?=.\d)(?=.[!@#$%^&()_+])[A-Za-z\d!@#$%^&()_+]{8,12}$" /><br />
            Password: <input type="password" name="password" value={formData.password} onChange={handleChange} required pattern="^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()+])[A-Za-z\d!@#$%^&*()+]{8,12}$" /><br />
            Confirm password: <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required pattern="^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()+])[A-Za-z\d!@#$%^&*()+]{8,12}$" /><br />
            <br />
            <br />
            <input type="submit" value="Signup" />
          </form>
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <p >Already Have an Account</p>
          <Link to="/login" >
            <button>Login</button>
            
          </Link>
        </div>

        {/* <button onClick={handleVerifyData}>Verify Data Integrity</button> */}

        <div className="terms">
          <p>
            By creating an account you agree to our{' '}
            <a href="#" style={{ color: 'dodgerblue' }}>
              Terms & Privacy
            </a>
            .
          </p>
        </div>
      </body>
    </html>
  );
}

export default Signup;