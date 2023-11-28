import React from "react";
import "../App.css";
import ComingSoon from "../images/ComingSoonPic.png";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function Home() {
  return <div className="comingSoon">
          
        <h2> Welcome to PetPals Connect! 🐾</h2>
<h3>Where whiskers meet wags and snuggles find homes, PetPals Connect is your magical carousel of cuddles! </h3>

        <img src={ComingSoon} alt="Coming Soon" className="homePagePic"></img>
        <p>Are you dreaming of a furry muse to fill your days with purrs, zoomies, and unconditional love? Look no further! Our little corner of the internet is where human hearts and animal adorableness collide in a spectacle of pawsome pairings!</p>
        <h3>Join us at PetPals Connect – where with every click, you're closer to finding your forever friend!</h3>
    </div>;
}

export default Home;
