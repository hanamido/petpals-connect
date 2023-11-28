import React from "react";
import "../App.css";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";
import SearchBar from "../Components/SearchBar";

function Navbar() {
  //TODO: add account logic to see if user is account admin
  const isAccountAdmin = true;
  return (
    <div className="Navbar">
      <img className="iconLarge" src={bone}></img>
      <div className="Left"><a href="/">PetPals Connect</a></div>
      <div className="Center">
        <div className="pageLinks">
          <a href="/account">Login</a>
          <a href="/browse">Browse Pets</a>
          <a href="/contact">Contact Us</a>
          {isAccountAdmin ? <a href="/add">Add Profile</a> : null}
          {isAccountAdmin ? <a href="/delete">Edit or Delete Pet</a> : null}
        </div>
      </div>
<SearchBar/>
      <div className="account">
        <a href="/account">
          <img className="iconLarge" src={user}></img>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
