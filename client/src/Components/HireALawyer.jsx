import React, { useState ,useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useTransferNativeToken, useAddress, useContract , useContractWrite} from '@thirdweb-dev/react'; // Import the Web3Button component from the thirdweb library



const HireLawyerButton = ({ lawyer, onHireSuccess, onHireError,user,accept}) => {
  const myaddress= useAddress();
  const { contract } = useContract("0x006dd039Fb88580A45e407764bD08053Af045c14");
  const { mutateAsync: sendMoney } = useContractWrite(contract, "sendMoney");
    const { mutate: transferNativeToken, isLoading, error } = useTransferNativeToken();
    const [show, setShow] = useState(false);
    const [amount, setAmount] = useState('');
    const now= new Date();
    const date=now.toLocaleDateString();
    const time=now.toLocaleTimeString();
  
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const handleAmountChange = (e) => {
      setAmount(e.target.value);
    };

    const transact= async ()=>{
        if (user && accept) {
            if (lawyer !== "" && amount > 0) {
              console.log("Wait");
              console.log(amount);
                transferNativeToken({ to: lawyer, amount: amount });
                try {
                  const data = await contract.call("sendMoney", [[myaddress, lawyer, amount, date, time]]);
                  console.info("contract call success", data);
                //   {
                //     const from = userAddress;
                //     const to = lawyer.Address;
                //     const amount = "0.1"; // Assuming amount is fixed at 0.1
            
                //     const newArray = [from, to, amount, date, time];
                //   console.log("Details are:- ",newArray);
                //     sendMoney(newArray)
                //         .then(() => alert('Lawyer hired successfully'))
                //         .catch(error => alert(`Error hiring lawyer: ${error.message}`));
                // }
                } catch (err) {
                  console.error("contract call failure", err);
                }
                
              
                //writing 
            }
        }
    
    

    if (error) {
        console.error("failed to transfer tokens", error);
    }
  };

  return (
    <>
  <Button style={{backgroundColor:"#ED7D31" , border:"none" }} variant="primary" onClick={handleShow}>
    Hire
  </Button>

  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Enter Amount to Hire</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>

     <Button variant="primary" style={{backgroundColor:"#ED7D31" , border:"none"}} onClick={() => { handleClose(); transact(); }} >
        Hire
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</>
);
};


export default HireLawyerButton;
