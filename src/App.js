import './App.css';
import React from "react";
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages/home';
import LoginUser from './pages/login';
import Logout from './pages/logout';
import Register from './pages/register';
import Journal from './pages/journal';
import Forgot from './pages/forgot';

function App() {


return (
      <div>

    <div>
    <Router>
    <Navbar/>


    <Routes>
        <Route path='/' element={<Home/>} />
      <Route path='/login' element={<LoginUser/>} />
    <Route path='/logout' element={<Logout/>} />
    <Route path='/register' element={<Register/>} />
  <Route path='/journal' element={<Journal/>} />
<Route exact path='/forgot' element={<Forgot/>}/>
    </Routes>
    </Router>
  </div>
  </div>
);
}



export default App;
