import React from "react";
import "../App.css";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function Navbar() {
  //TODO: add account logic to see if user is account admin
  const isAccountAdmin = true;
  return (
    <div className="Navbar">
      <img className="iconLarge" src={bone}></img>
      <div className="Left">PetPals Connect</div>
      <div className="Center">
        <div className="pageLinks">
          <a href="/account">Login</a>
          <a href="/browse">Browse Pets</a>
          <a href="/contact">Contact Us</a>
          {isAccountAdmin ? <a href="/add">Add Pet</a> : null}
          {isAccountAdmin ? <a href="/edit">Edit Pet</a> : null}
          {isAccountAdmin ? <a href="/delete">Delete Pet</a> : null}
        </div>
      </div>
      <div className="Search">
        <input type="text" placeholder="Search" />
        <button>Go!</button>
      </div>
      <div className="account">
        <a href="/account">
          <img className="iconLarge" src={user}></img>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
