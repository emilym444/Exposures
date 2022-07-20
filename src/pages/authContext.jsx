import React, {createContext, useState, useEffect} from "react";
// import {
//   useNavigate
// } from "react-router";

export const AuthContext = createContext();

export const UserContext = ({children}) => {
  const [user, setUser] = useState({isLoggedIn: null});
  // const navigate = useNavigate();
  useEffect(() => {
    console.log(document.cookie);
    if (document.cookie && document.cookie !== "") {
      setUser({isLoggedIn: true});
    } else {
      setUser({isLoggedIn: false});
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >

      {children}
    </AuthContext.Provider>
  );
};
