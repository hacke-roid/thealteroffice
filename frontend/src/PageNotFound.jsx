import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigation = useNavigate();
  setTimeout(() => {
    navigation("/");
  }, 2000); // redirect to login page after 2 seconds

  return (
    <div>
      <h1>Page Not Found..</h1>
      <p>Redirecting to login...</p>
    </div>
  );
};

export default PageNotFound;
