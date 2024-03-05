import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './AuthContext';
import "./styles/globals.css";


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      // clientId={"0b52d193c01b51dbe7f2f2720f601799"}
      clientId={"5c59b77d35cb30dddfb14427ac6d0989"}
      activeChain={activeChain}
    >
         <GoogleOAuthProvider clientId="113614079343-7p7sp9aa11p5dk85mvb6u3rbl81s21ck.apps.googleusercontent.com">
         <AuthProvider>
    


      <App />
      </AuthProvider>
      </GoogleOAuthProvider>
    </ThirdwebProvider>
  </React.StrictMode>
);
