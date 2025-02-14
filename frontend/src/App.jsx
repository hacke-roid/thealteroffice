import { GoogleLogin } from "@react-oauth/google";
import { useContext, useState } from "react";
import React from "react";
import { decodeJwt } from "jose";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext/ContextApi";
import "./App.css";
function App() {
  // const [user, setUser] = useState(null);
  const navigation = useNavigate();
  let { setData, setIsLogin } = useContext(MyContext);

  return (
    <div className="login_container">
      <h1>Login Here</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          const { credential } = credentialResponse;
          const payload = credential ? decodeJwt(credential) : undefined;
          if (payload) {
            axios
              .get(`http://localhost:5000/api/auth/login`, {
                headers: {
                  Authorization: `Bearer ${credential}`,
                },
              })
              .then((response) => {
                console.log(response);
                if (response.status === 200) {
                  setData(response);
                  setIsLogin(true);
                  localStorage.setItem("userId", response.data.user._id);
                  navigation("/dashboard");
                }
              })
              .catch((error) => console.log("error occured", error));
          }
        }}
        onError={(error) => console.log(error)}
      />
    </div>
  );
}

export default App;
