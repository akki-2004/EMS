
import React, { useState, useEffect } from 'react';
import { useContract, useContractRead, useAddress } from "@thirdweb-dev/react";

const YourComponent = () => {
  const [data2, setData2] = useState([]);
  const userAddress = useAddress();

  const { contract } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");
  const { data: transact, isLoading: transactLoading, error: transactError } = useContractRead(contract, "getAllTransactions", [userAddress]);

  useEffect(() => {
    if (transact) {
      console.log("transact data:", transact);
      setData2(transact);
    }
  }, [transact]);

  const handleButtonClick = async () => {
    // You can add logic here if needed
  };

  return (
    <div>
      {/* <button onClick={handleButtonClick}>Get Transactions</button> */}
      <div>
        <h2>Transactions:</h2>
        <ul>
          {data2.map((transaction, index) => (
            <li key={index}>
              <strong>To:</strong> {transaction[1]}, <strong>Amount:</strong> {transaction[2]}, <strong>Date:</strong> {transaction[3]}, <strong>Time:</strong> {transaction[4]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YourComponent;
