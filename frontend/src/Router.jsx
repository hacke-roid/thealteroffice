// import { Router } from 'express'
import React, { useContext } from "react";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard";
import { MyContext } from "./MyContext/ContextApi";
import PageNotFound from "./PageNotFound";

const Routers = () => {
  const { isLogin } = useContext(MyContext);
  console.log(isLogin);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/dashboard"
          element={isLogin ? <DashBoard /> : <PageNotFound />}
        />
      </Routes>
    </Router>
  );
};

export default Routers;
