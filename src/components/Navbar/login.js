import React, {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";




const LoginUser = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  const getUser = () => {
    axios({method: "get",
     withCredentials: true,
     url: "http://localhost:3000/user"
   }).then((res) => setData(res.data));
  };

  const login = () => {
    axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:3000/login"
    }).then((res) => console.log(res));
  };

  return(

    <div className="login">

    <div>
      <h1>Login</h1>
    </div>
      <div>
      <label>Email</label>
      <input className="loginInput" placeholder="username" onChange={e => setLoginUsername(e.target.value)}/>
      </div>
      <div>
       <label>Password</label>
       <input className="loginInput" placeholder="password" onChange={e => setLoginPassword(e.target.value)}/>
    </div>
    <div>
  <button onClick={login}>Login</button>
  <div>
     <Link to={"/forgot"}>Forgot Password?</Link>
  </div>

  <button onClick={getUser}>Submit</button>
     {
       data
         ? <h1>Welcome {data.username}</h1>
         : null
      }

</div>

</div>
  );
};

export default LoginUser;
