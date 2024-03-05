import React from 'react' 
import "../styles/page1.css";
import {Link,useNavigate} from "react-router-dom"

import  { useState ,useEffect} from 'react';
import { useAuth } from '../AuthContext';

export default function Fir() {
  const navigate=useNavigate();
  const weh={
    backgroundColor: "white",
    width: "40%",
    textAlign: "center",
    padding:"5%",
    display: "flex",
    flexDirection: "column", // Set to column layout
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    
  };
  
  const ewhf={
      backgroundColor:"#ED7D31",
      padding:"1.3%",
      width:"20%",
      color:"white",
      fontSize:"20px",
      fontWeight:"bold"
  }
  const fir_options={
    color:'black',
  }
  const ajfeb={
  
 
    fontSize:"20px",
    fontWeight:"bold"
}

  const { isAuthenticated } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = () => {
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  };

  useEffect(() => {
    checkLoginStatus();
  
  }, []);
  const handleLoginClick1 = () => {
    
    navigate('/login');
  };
  if (!isAuthenticated ) {
    return (
      <div style={weh}>
        <p style={ajfeb}>Please log in to File an FIR.</p>
        <button style={ewhf} onClick={handleLoginClick1}>Login</button>       
      </div>
    );
  }

  return (
    <>

    <div className="first">
        
    <h1 className='sfwe'>What do you want to do?</h1>
      <div className="fir_buttons">
        <Link to="/write">
          <input
            type="button"
            className="fir_options"
            style={fir_options}
            value="File FIR"
          />
        </Link>
        <Link to="/read">
          <input
            type="button"
            className="fir_options"
            style={fir_options}
            value="View FIR"
          />
        </Link>
        <Link to="/book">
          <input
            type="button"
            className="fir_options"
            style={fir_options}
            value="FIR Book"
          />
        </Link>
        
      </div>
  </div>
  </>
  );
};




