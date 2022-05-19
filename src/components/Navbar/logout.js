import React from "react";
import axios from "axios";

const Logout = () => {

  const logOut = () => {
    axios({
    method: "delete",
    withCredentials: true,
    url: "http://localhost:3000/logout"
  }).then((res) => console.log(res));
};
return(

<div>
<h1>Logout</h1>
<div>
<button onClick={logOut}>Logout</button>
</div>
</div>

);
};

export default Logout;
