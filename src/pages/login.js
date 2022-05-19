import React, {useState} from "react";
import {Link}  from "react-router-dom"
import axios from "axios";




const LoginUser = () => {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [welcome, setWelcome] = useState(null);


  const getUser = () => {
    axios({method: "get",
     withCredentials: true,
     url: "http://localhost:3000/user"
   }).then((res) => setWelcome(res.data));
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
    <div>
<body>
      <div className="container">
            {
              welcome
                ? <h1>Hello</h1>
                : <h1 className="loginTitle">Login</h1>
             }

      <label>Email</label>
      <input  placeholder="Email" type="text" onChange={e => setLoginUsername(e.target.value)} required/>
       <label for="passWord">Password</label>
       <input type="password" placeholder="Password" onChange={e => setLoginPassword(e.target.value)} required/>
         <button type="submit" onClick={() => {
          login();
          getUser();
        }}>Login</button>
         <div>
            <Link for="passWord" to={"/forgot"}>Forgot Password?</Link>
         </div>

    </div>
</body>
</div>
  );
};

export default LoginUser;
