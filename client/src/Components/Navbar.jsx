import React, { useState } from "react";
import { Navbar as BootstrapNavbar, Nav, Container ,Image,Button} from "react-bootstrap";
import {NavLink, Link } from "react-router-dom";
import "../styles/Navbar.css";
import image2 from "../images/microchip_7747473.png";
import LogoutButton from "../LogoutButton"; 
import { useAuth } from '../AuthContext';
import { ConnectWallet } from '@thirdweb-dev/react'; 
export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const { isAuthenticated } = useAuth();
  const handleToggleNav = () => {
    setExpanded(!expanded);
  };
  const styles = {
    ejb: {
      padding: '2%',
    },
    navbarBrand: {
      fontSize: '34px',
      fontWeight: 'bold',
      marginBottom: '0',
      color: '#ED7D31',
    },
    wkjfhb: {
      fontSize: '20px',
      fontWeight: '500',
    },
    vhb:{
      width: "8%",
      height: "10%",
      display:"inline",
      paddingRight:"2%",
      paddingBottom:"2%",
    }
  };
  return (
    <BootstrapNavbar style={styles.ejb}   expand="lg">
      
      <Link to="/" className="navbar-brand" style={styles.navbarBrand}>
         <img src={image2}   style ={styles.vhb}/>
          EviTech.
        </Link>
        <BootstrapNavbar.Toggle onClick={handleToggleNav} aria-controls="navbar-nav" />
        <BootstrapNavbar.Collapse id="navbar-nav" className={expanded ? "show" : ""}>
          <Nav className="ml-auto">
            <Nav.Link style={styles.wkjfhb} as={Link} to="/" onClick={handleToggleNav}>Home</Nav.Link>
            <Nav.Link style={styles.wkjfhb} as={Link} to="/fir" onClick={handleToggleNav}>File an FIR</Nav.Link>
            <Nav.Link style={styles.wkjfhb} as={Link} to="/evlog" onClick={handleToggleNav}>Evidence</Nav.Link>
            <Nav.Link style={styles.wkjfhb} as={Link} to="/lawyer" onClick={handleToggleNav}>Hire a Lawyer</Nav.Link>
            <Nav.Link style={styles.wkjfhb} as={Link} to="/trans" onClick={handleToggleNav}>History</Nav.Link>

            {/* <Nav.Link style={styles.wkjfhb} as={Link} to="/lawyer" onClick={handleToggleNav}>Case Details</Nav.Link> */}

       
            {isAuthenticated ? (
              <>
            
            
             
                      <Nav.Link style={styles.wkjfhb} as={Link} to="/lawyer" onClick={handleToggleNav}>    <LogoutButton /></Nav.Link>
                
            
            </>
          ) : (
            <>
              <Nav.Link style={styles.wkjfhb} as={Link} to="/login" onClick={handleToggleNav}>
                Login
              </Nav.Link>
              <Nav.Link style={styles.wkjfhb} as={Link} to="/signup" onClick={handleToggleNav}>
                SignUp
              </Nav.Link>
            </>
          )}
          </Nav>
        </BootstrapNavbar.Collapse>
      
    </BootstrapNavbar>
  );
}
