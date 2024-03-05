import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Signup1 = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <Container style={styles.container}>
      <h2 style={{marginBottom:"5%"}}>Select an Option:</h2>
      <Button  variant="primary" style={styles.optionButton}><Link to='/citizen' style={styles.link}>Citizen</Link></Button>
      <Button variant="primary" style={styles.optionButton}><Link to='/police' style={styles.link}>Police</Link></Button>
      <Button variant="primary" style={styles.optionButton}><Link to='/advocate' style={styles.link}>Advocate</Link></Button>
    </Container>
    </GoogleOAuthProvider >
    </>
  );
};
// style={{ ,
//     color: "#fff",}}
const styles = {
  container: {
    // fontFamily: 'Arial, sans-serif',
    width: '100%',
    position: 'relative',
    // color: '#CD5C08',
    height: '100vh',
    top: '100px',
    fontWeight: 'bolder',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#ED7D31',
    border: 'none',
    padding: '20px 40px', // This is the corrected line
    fontSize: '16px',
    margin: '10px',
    cursor: 'pointer',
    transition: 'font-size 0.3s ease',
  },
  optionButtonHover: {
    fontSize: '40px',
  },
  link: {
    color: 'inherit',
    textDecoration: 'none',
  },
};


export default Signup1;
