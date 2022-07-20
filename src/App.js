import React from "react";
import {
  UserContext
} from "./pages/authContext";
import Views from "./components/views"



function App() {
  return (
   <UserContext>
   <Views/>
   </UserContext>
    );
  }

export default App;
