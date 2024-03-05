import React from 'react';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import WriteFir from "./Components/WriteFir.jsx";
import ReadFir from './Components/ReadFir.jsx';
import LatestFir from './Components/LatestFirs.jsx';
import FirDetails from './Components/FirDetails';
import Fir from './Components/FIr.jsx';
import Navbar from './Components/Navbar.jsx';
import Main from './Components/Home.jsx';

import Login from './Components/Login.jsx';
import Evidence from './Components/evidence.jsx';
import SignUpPage from './Components/Police.jsx';
import SignUppage1 from './Components/Advocate.jsx';
import Signup from './Components/Citizen.jsx';
import Signup1 from './Components/SignUp.jsx';
// import EvidenceWrite from './Components/imageHash.jsx';
import LawyerPage from './Components/LawyerPage.jsx';
import EvidenceRead from './Components/EvidenceRead.jsx';
import Evidencelog from './Components/Evidencelog.jsx';
import Policelog from './Components/PoliceLog.jsx';
import EvidenceWrite from  './Components/EvidenceWrite.jsx';
import YourComponent from './Components/AllTransactions.jsx';

// import MyForm from './Components/fehb.jsx';
// import FIRList from './Components/firs.jsx';
export default function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
      
        <Route path='/write' element={<WriteFir />} />
        <Route path='/hash' element={<EvidenceWrite />} />
        <Route path='/read' element={<ReadFir />} />
        <Route path="/fir-details/:id" element={<FirDetails />} />
        <Route path="/book" element={<LatestFir />} />
        <Route path="/fir" element={<Fir />} />
        <Route path="/writeee" element={<EvidenceWrite/>} />
        <Route path="/readdd" element={<EvidenceRead/>} />

        <Route path="/" element={<Main />} />
        <Route path="/evlog" element={<Evidencelog />} />
        {/* <Route path="/plog" element={<Policelog />} /> */}
        <Route path="/trans" element={<YourComponent />} />


        


        <Route path="/evidence" element={<Evidence />} />
        <Route path="/lawyer" element={< LawyerPage/>} />

       
        <Route path="/login" element={<Login />} />
        <Route path="/police" element={<SignUpPage />} />

        <Route path="/advocate" element={<SignUppage1 />} />

        <Route path="/citizen" element={<Signup />} />
        <Route path="/signup" element={<Signup1 />} />
        
      </Routes>
    </BrowserRouter>
    </>
  );
}
