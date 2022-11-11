import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";

import AuthService from "./services/auth.service";


import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Upload from "./components/Upload";
import Timeline from "./components/Timeline";

const App = () => {
  // const user = AuthService.getCurrentUser();
  // const [userUrl, setUserUrl] = useState("");

  // if(user){
  //   setUserUrl("/files/" + user["username"]);
  // }  

  return (
    <div className="app">
      <Navbar/>
      
      <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            {/* <Route path="/home" element={<Home/>} /> */}
            <Route path="/files" element={<Timeline/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/page" element={<BoardUser/>} />
            {/* <Route path={userUrl} element={<BoardUser/>} /> */}
            <Route path="/mod" element={<BoardModerator/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
            {/* <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} /> */}
            <Route path="/upload" element={<Upload/>} />  
          </Routes>
      </div> 
    </div>
  );
};

//   return (
//     <div className="app">
//       <nav className="navbar navbar-expand">
//         <Link to={"/"} className="navbar-brand">
//           Fotolog
//         </Link>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/home"} className="nav-link">
//               Home
//             </Link>
//           </li>         

//         
//       </nav>

//       <div className="container mb-1 mt-3">
//         <Routes>
//           <Route path="/" element={<Home/>} />
//           <Route path="/home" element={<Home/>} />
//           <Route path="/files" element={<Timeline/>} />
//           <Route path="/login" element={<Login/>} />
//           <Route path="/register" element={<Register/>} />
//           <Route path="/profile" element={<Profile/>} />
//           <Route path={userUrl} element={<BoardUser/>} />
//           <Route path="/mod" element={<BoardModerator/>} />
//           <Route path="/admin" element={<BoardAdmin/>} />
//           <Route path="/upload" element={<Upload/>} />
//         </Routes>
//       </div>
//       <div className="footer"></div>
//     </div>
//   );
// };

export default App;