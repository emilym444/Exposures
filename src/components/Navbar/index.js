import React from "react";
import { Nav, NavLink, NavMenu }
    from "./NavbarElements";


const Navbar = () => {

  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/register" >
            Register
          </NavLink>
          <NavLink to="/login">
            Login
          </NavLink>
        <NavLink to="/logout">
            Logout
          </NavLink>
          <NavLink to="/journal">
            Journal
          </NavLink>
        </NavMenu>

      </Nav>
    </>
  );
};

export default Navbar;
