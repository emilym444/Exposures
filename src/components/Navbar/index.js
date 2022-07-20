import React, {useContext} from "react";
import {Nav, NavLink, NavMenu} from "./NavbarElements";
import {AuthContext} from "../../pages/authContext";
import axios from "axios";
import {useNavigate} from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);
  const logOut = () => {
    axios({
      method: "delete",
      url: "http://localhost:3000/index",
      withCredentials: true
    }).then(res => {
      setUser({isLoggedIn: false});
      navigate("/");
    });
  };
  const {user} = useContext(AuthContext);
  if (user.isLoggedIn === true) {
    return (
      <>
        <Nav>
          <NavMenu>
            <NavLink className="NavbarEl" to="/">
              Home
            </NavLink>
            <NavLink className="NavbarElJournal" to="/journal">
              Journal
            </NavLink>
            <NavLink className="NavbarEl" to="/deleteAccount">
              Delete Account
            </NavLink>
            <button className="navLogout" onClick={logOut}>
              Logout
            </button>
          </NavMenu>
        </Nav>
      </>
    );
  } else {
    return (
      <>
        <Nav>
          <NavMenu>
            <NavLink className="NavbarEl" to="/">
              Home
            </NavLink>
            <NavLink className="NavbarEl" to="/register">
              Register
            </NavLink>
            <NavLink className="NavbarEl" to="/login">
              Login
            </NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  }
};

export default Navbar;
