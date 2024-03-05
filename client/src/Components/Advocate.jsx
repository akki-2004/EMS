
import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';
// import '../styles/Signup.css';
const SignUppage1 = () => {
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({
    Name: '',
    email: '',
    mobileNo: '',
    dob: '',
    gender: '',
    typeofadvocate: '',
    court: '',
    bar: '',
    city: '',
    state: '',
    district: '',
    pincode: '',
    loginId: '',
    password: '',
    confirmPassword: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
   
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3002/register3', formData);
      console.log(result);
      login();
      navigate('/');
      // Handle success, maybe show a success message or redirect to login
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        console.error(err.response);
      }
      // Handle error, maybe show an error message
    }

    console.log('Form submitted:', formData);
  };


  return (
    <>
      <title>Signup Advocate</title>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif; 
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
            .button {
              background-color: #4CAF50;
              color: white;
              padding: 10px 15px;
              border: none;
              border-radius: 4px;
              font-size: 16px; 
            }
            .heading, .terms {
              color: black;
              font-family: Arial;
              font-size: 120%;
              text-align: left;
            }
            .form1 {
              margin-left: 38%;
              justify-content: center;
              align-items: center;
            }
            .terms {
              margin-left: 38%;
              justify-content: center;
              align-items: center;
              font-size: larger;
            }
          `
        }}
      />
      <h style={{ color: 'black', fontFamily: 'Georgia', fontSize: '300%', textAlign: 'center' }}>Signup:Advocate</h>
      <div className="form1">
        <h1 className="heading">Personal Details</h1>
        <form onSubmit={handleSubmit} className="form">
          Name: <input type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="off" required pattern="[A-Za-z\s]+" maxLength={15} /><br />
          Email ID: <input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="off" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" /><br />
          Mobile no.: <input type="number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} autoComplete="off" required maxLength={10} /><br />
          DOB: <input type="date" name="dob" value={formData.dob} onChange={handleChange} autoComplete="off" required max="2005-04-09" /><br />
          Gender:
          Male: <input type="radio" name="gender" value="male" onChange={handleChange} />
          Female: <input type="radio" name="gender" value="female" onChange={handleChange} />
          Other: <input type="radio" name="gender" value="other" onChange={handleChange} /><br />
          Type of Advocate: <input list="typeofadvoacte" name="typeofadvocate" value={formData.typeofadvocate} onChange={handleChange} />
          <datalist id="typeofadvocate">
            <option value="Intellectual property lawyers" />
            <option value="Public interest lawyer" />
            <option value="Corporate lawyer" />
            <option value="Tax lawyer" />
            <option value="immigration lawyer" />
            <option value="Criminal lawyer" />
            <option value="Civil rights lawyer" />
            <option value="family lawyer" />
            <option value="environment lawyer" />
          </datalist><br />
          Court: <input type="text" name="court" value={formData.court} onChange={handleChange} autoComplete="off" /><br />
          bar council registration: <input type="text" name="bar" value={formData.bar} onChange={handleChange} autoComplete="off" /><br />
          {/* ... (remaining personal details) ... */}
          <br />
          <br />
        </form>
      </div>
    
      <div className="form1">
        <h1 className="heading">Login credentials</h1>
        <form  onSubmit={handleSubmit}   className="form">
          Login id: <input type="text" name="loginId" value={formData.loginId} onChange={handleChange} autoComplete="off" required pattern="(?=.\d)(?=.[!@#$%^&()_+])[A-Za-z\d!@#$%^&()_+]{8,12}$" /><br />
          Password: <input type="password" name="password" value={formData.password} onChange={handleChange} autoComplete="off" required pattern="^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()+])[A-Za-z\d!@#$%^&*()+]{8,12}$" /><br />
          Confirm password: <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} autoComplete="off" required pattern="^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()+])[A-Za-z\d!@#$%^&*()+]{8,12}$" /><br />
          {/* ... (remaining login credentials) ... */}
          <br />
          <br />
          <input type="submit" className="button" value="Signup"  />
          <input type="button" className="button" value="Create wallet" />
        </form>
        {/* ... (GoogleLogin and Login button) ... */}
      </div>
      <div className="form1">
         
          {/* <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={() => {
              console.log('Login Failed');
            }}
          />*/}
          <p>Already Have an Account?</p>
          <Link to="/login" className="btn btn-default border w-40 bg-light rounded-0 text-decoration-none" style={{ fontSize: '14px', padding: '8px 12px' }}>
            Login
          </Link>
        </div>
      <div className="terms">
        <p>By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms & Privacy</a>.</p>
      </div>
    </>
  );
};

export default SignUppage1;