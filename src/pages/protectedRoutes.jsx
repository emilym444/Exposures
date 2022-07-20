import React, {useContext} from "react";
import {Navigate, Outlet} from "react-router";
import {AuthContext} from "./authContext";


const useAuth = () => {
  const { user } = useContext(AuthContext);
  return user && user.isLoggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
