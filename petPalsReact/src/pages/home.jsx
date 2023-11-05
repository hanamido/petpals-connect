import React from "react";
import "../App.css";
import ComingSoon from "../images/ComingSoonPic.png";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function Home() {
  return <div>
          <div className="comingSoon">
        <h1>PetPals Connect...More coming soon!</h1>
      </div>
      <div className="comingSoon">
        <img src={ComingSoon} alt="Coming Soon"></img>
      </div>
      <div></div>
    </div>;
}

export default Home;
