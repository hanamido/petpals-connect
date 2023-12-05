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
import EditForm from "./pages/editForm";
import MoreDetails from "./pages/moreDetails";
import SearchResults from "./pages/searchResults";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  // checks if the user has been authenticated or not yet
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>

        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<Account />} />
            < Route path="/browse" element={<Browse/>}/>
            <Route path="/add" element={<AddPet />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/delete" element={<DeletePet />} />
            <Route path="/edit" element={<EditPet />} />
            <Route path="/editForm" element={<EditForm/>}/>
            <Route path="/moreDetails" element={<MoreDetails/>}/>
            <Route path="/searchResults" element={<SearchResults/>}/>
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
