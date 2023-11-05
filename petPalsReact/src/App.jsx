import { useState } from "react";
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from "./Components/Navbar";
import Account from "./pages/account";
import Browse from "./pages/browse";
import AddPet from "./pages/add";
import ContactUs from "./pages/contact";
import DeletePet from "./pages/delete";
import EditPet from "./pages/edit";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Navbar />
        <BrowserRouter>
          <Routes>
                        <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            < Route path="/browse" element={<Browse/>}/>
            <Route path="/add" element={<AddPet />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/delete" element={<DeletePet />} />
            <Route path="/edit" element={<EditPet />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
