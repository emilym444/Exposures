import React, {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "./authContext";
import {useNavigate} from "react-router";

const Delete = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(AuthContext);
  // const [getUser, setUserInfo] = useState({email: "", _id: ""});
  const [click, getClick] = useState(false);
  const [goodbye, setGoodbye] = useState(false);

  function areYouSure() {
    getClick(true);
  }
  function handleKeep() {
    navigate("/journal");
  }
  function handleRemove() {
    console.log("1");
    axios({
      method: "get",
      url: "http://localhost:5000/account",
      withCredentials: true
    }).then(res => console.log(res.data));
    setUser({isLoggedIn: false});
    setGoodbye(true);
    navigate("/");
  }

  return (
    <div>
      <h1>Delete Account</h1>
      <button onClick={() => areYouSure()}>Delete Account</button>
      {click ? (
        <div>
          <h1>Permanently Delete Account?</h1>
          <button onClick={() => handleRemove()}>Yes</button>
          <button onClick={() => handleKeep()}>No</button>
        </div>
      ) : null}
      <div>
      {
        goodbye ? <h1> Gooodbye, take care of yourself </h1> : null
      }
      </div>
    </div>
  );
};

export default Delete;
