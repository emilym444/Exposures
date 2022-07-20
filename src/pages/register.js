import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "./authContext";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [userMessage, setUserMessage] = useState(null);
  const {setUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const register = () => {
    if (registerPassword === confirmPassword) {
      axios({
        method: "POST",
        data: {
          email: registerEmail,
          password: registerPassword
        },
        withCredentials: true,
        url: "https://exposures-ocd.herokuapp.com/register"
      }).then(res => {
        console.log(res);
        if (!res || res.status >= 400) {
          return;
        }
        if (res.data.isLoggedIn === true) {
          setUser({isLoggedIn: true});
          navigate("/journal");
        } else {
          setUser({isLoggedIn: false});
          setUserMessage(true);
        }
      });
    } else {
      console.log("Passwords do not match");
      setMessage(true);
    }
  };
  const handleChange = event => {
    const emailValue = event.target.value;
    const lowerCase = emailValue.toLowerCase();
    setRegisterEmail(lowerCase);
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <label>Email</label>
      <input type="Email" placeholder="Email" onChange={handleChange} />
      <label for="passWord">Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={e => setRegisterPassword(e.target.value)}
      />
      <label for="passWord">Verify Password</label>
      <input
        type="password"
        placeholder="Password"
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <button onClick={register}>Submit</button>
      {message ? <h3>Passwords do not match</h3> : null}
      {userMessage ? (
        <div>
          <h3>User Exists</h3>
          <Link className="forgot" for="passWord" to={"/login"}>
            {" "}
            Login
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Register;
