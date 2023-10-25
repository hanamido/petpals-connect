import { useState } from "react";
//import {BrowserRouter, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./Components/Navbar";
import ComingSoon from "./images/ComingSoonPic.png";

function App() {
  return (
    <>
      <Navbar />
      <div className="comingSoon">
        <h1>PetPals Connect...More coming soon!</h1>
      </div>
      <div className="comingSoon">
        <img src={ComingSoon}></img>
      </div>
    </>
  );
}

export default App;
