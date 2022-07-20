import "../App.css";
import React, {useContext} from "react";
import Navbar from "./Navbar";
import {Routes, Route} from "react-router-dom";
import Home from "../pages/home";
import LoginUser from "../pages/login";
import Register from "../pages/register";
import Journal from "../pages/journal";
import Forgot from "../pages/forgot";
import Delete from "../pages/deleteAccount";
import {AuthContext} from "../pages/authContext";
import ProtectedRoutes from "../pages/protectedRoutes";

const Views = () => {
  const {user} = useContext(AuthContext);
  return user === null ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<Register />} />
        <Route exact="exact" path="/forgot" element={<Forgot />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="deleteAccount" element={<Delete />} />
          <Route path="/journal" element={<Journal />} />
        </Route>
        <Route path="*" element={<LoginUser />} />
      </Routes>
    </>
  );
};

export default Views;
