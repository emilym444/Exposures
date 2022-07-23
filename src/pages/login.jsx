import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "./authContext";
import {useNavigate} from "react-router";
import {Link} from "react-router-dom";
const LoginUser = event => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const obj = {
    isLoggedIn: null,
    email: ""
  };

  const login = event => {
    axios({
      method: "POST",
      data: {
        email: loginEmail,
        password: loginPassword
      },
      url: "http://localhost:5000/login",
      withCredentials: true,
      body: JSON.stringify(obj)
    })
      .catch(err => {
        console.log(err);
        return;
      })
      .then(res => {
        console.log(res);
        if (!res || res.status >= 400) {
          return;
        }
        if (res.data.isLoggedIn === true) {
          setUser({isLoggedIn: true});
          navigate("/journal");
        } else {
          setUser({isLoggedIn: false});
          navigate("/login");
        }
      });

    event.preventDefault();
  };

  return (

    <form onSubmit={login} className="container">
      {" "}
      <h1 className="title"> Login </h1>
      <label> Email </label>{" "}
      <input
        placeholder="Email"
        type="Email"
        onChange={e => setLoginEmail(e.target.value)}
        required
      />{" "}
      <label htmlFor="passWord"> Password </label>{" "}
      <input
        type="password"
        placeholder="Password"
        autoComplete="true"
        onChange={e => setLoginPassword(e.target.value)}
        required
      />{" "}
      <button type="submit"> Login </button>
      <div>
        <Link className="forgot" for="passWord" to={"/forgot"}>
          Forgot Password?
        </Link>
      </div>
    </form>

  );
};

export default LoginUser;
