import { useState } from "react";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from "./Components/Navbar";
import ComingSoon from "./images/ComingSoonPic.png";
import Account from "./pages/account";
import AddPet from "./pages/add";
import ContactUs from "./pages/contact";
import DeletePet from "./pages/delete";
import EditPet from "./pages/edit";

function App() {
  return (
    <>
      <Navbar />
      <div className="comingSoon">
        <h1>PetPals Connect Service</h1>
      </div>
      <div className="comingSoon">
        <img src={ComingSoon} alt="Coming Soon"></img>
      </div>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/account" element={<Account />} />
            <Route path="/add" element={<AddPet />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/delete" element={<DeletePet />} />
            <Route path="/edit" element={<EditPet />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
