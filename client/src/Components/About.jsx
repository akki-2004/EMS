import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <h1 style={{textAlign:"center"}}>About Us</h1>
      <br></br>
      <p style={{textAlign:"center",fontSize:"22px"}}>Welcome to our team page! Meet our awesome team members:</p>
      <br></br>

      <br></br>

      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <div style={{ width: '30%', margin: '20px', textAlign: 'center' }}>
          <img src="person1.jpg" alt="Person 1" style={{ width: '80%', borderRadius: '50%', marginBottom: '10px' }} />
          <h2>Akshay Satya</h2>
          <p>Role: Front End part</p>
          
        </div>
        <div style={{ width: '30%', margin: '20px', textAlign: 'center' }}>
          <img src="person2.jpg" alt="Person 2" style={{ width: '80%', borderRadius: '50%', marginBottom: '10px' }} />
          <h2>Aiman Zareen</h2>
          <p>Role: Blockchain part</p>
          
        </div>
        <div style={{ width: '30%', margin: '20px', textAlign: 'center' }}>
          <img src="person3.jpg" alt="Person 3" style={{ width: '80%', borderRadius: '50%', marginBottom: '10px' }} />
          <h2>Shiva Shankar</h2>
          <p>Role: Solidity part</p>
          
        </div>
      <br></br>
      <br></br>

        <div style={{ width: '30%', margin: '20px', textAlign: 'center' }}>
          <img src="person4.jpg" alt="Person 4" style={{ width: '80%', borderRadius: '50%', marginBottom: '10px' }} />
          <h2>S.Yashaswini</h2>
          <p>Role: Solidity part</p>
          
        </div>
        <div style={{ width: '30%', margin: '20px', textAlign: 'center' }}>
          <img src="person5.jpg" alt="Person 5" style={{ width: '80%', borderRadius: '50%', marginBottom: '10px' }} />
          <h2>Mohammad Altaf </h2>
          <p>Role: Mongo DB Connection</p>
          
        </div>
        <div style={{ width: '30%', margin: '20px', textAlign: 'center' }}>
          <img src="person6.jpg" alt="Person 6" style={{ width: '80%', borderRadius: '50%', marginBottom: '10px' }} />
          <h2>Mohammad Mushraf </h2>
          <p>Role: Mongo DB Connection</p>
          
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
