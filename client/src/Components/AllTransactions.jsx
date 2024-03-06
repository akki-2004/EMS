import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";

const YourComponent = () => {
  const [data2, setData2] = useState([]);
  const userAddress = useAddress();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Authentication check
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLoginStatus = () => {
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  };
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
  const ajfeb={
  
 
    fontSize:"20px",
    fontWeight:"bold"
}
  useEffect(() => {
    checkLoginStatus();
  
  }, []);
  const handleLoginClick1 = () => {
    
    navigate('/login');
  };
  if (!isAuthenticated ) {
    return (
      <div style={weh}>
        <p style={ajfeb}>Please log in to View Your History.</p>
        <button style={ewhf} onClick={handleLoginClick1}>Login</button>       
      </div>
    );
  }
  const fir_options={
    color:'black',
  }


  const { contract } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");
  const { data: transact, isLoading: transactLoading, error: transactError } = useContractRead(contract, "getAllTransactions", [userAddress]);

  useEffect(() => {
    if (transact) {
      console.log("transact data:", transact);
      setData2(transact);
    }
  }, [transact]);

  return (
    <>
      <div>
        <h1>Transactions:</h1>
        <ul>
          {data2.map((transaction, index) => (
            <li key={index}>
              <strong>To:</strong> {transaction[1]}, <strong>Amount:</strong> {transaction[2]}, <strong>Date:</strong> {transaction[3]}, <strong>Time:</strong> {transaction[4]}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default YourComponent;
