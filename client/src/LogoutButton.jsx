// LogoutButton.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && (
        <Button  onClick={logout} variant="danger">
          Logout
        </Button>
      )}
    </div>
  );
};

export default LogoutButton;
