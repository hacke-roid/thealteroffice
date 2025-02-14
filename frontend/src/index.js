import React from "react";
import { createRoot } from "react-dom/client";
// import App from './App'
import Routers from "./Router";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MyProvider } from "./MyContext/ContextApi";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="293101367732-f0nsu0c0ofmdjobb667gap2vh0b6n6c8.apps.googleusercontent.com">
    <MyProvider>
      <Routers />
    </MyProvider>
  </GoogleOAuthProvider>
);
