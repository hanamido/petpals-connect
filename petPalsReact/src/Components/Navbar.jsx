import React from "react";
import "../App.css";


function Navbar() {
  return (
    <div className="Navbar">
      <div className="Left">PetPals Connect</div>
      <div className="Center">
        <div className="pageLinks">
          <a href="/account">Login</a>
          <a href="/browse">Browse Pets</a>
          <a href="/about">Contact Us</a>
          <a href="/add">Add Pet</a>
          <a href="/edit">Edit Pet</a>
          <a href="/edit">Delete Pet</a>
        </div>
      </div>
      <div className="Search">
        <input type="text" placeholder="Search" />
        <button>
          Go!
        </button>
      </div>
      <vr />
      <div className="account">
        {" "}
        <a href="/account">
        </a>
      </div>
    </div>
  );
}

export default Navbar;
