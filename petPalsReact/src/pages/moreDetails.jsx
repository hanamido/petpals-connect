import { useLocation } from "react-router-dom";
import React from "react";
import "../App.css";
import MoreDetailsCard from "../Components/MoreDetailsCard";

function MoreDetails() {
  const location = useLocation();
  const animal = location.state.animal;
  console.log(animal);
  return (
    <div className="loginContainer">
      <h1>More Details For {animal.animalName}</h1>
        <MoreDetailsCard
                    imgSrc={animal.imgSrc}
                    animalName={animal.animalName}
                    animalType={animal.animalType}
                    animalBreed={animal.animalBreed}
                    animalDisposition={animal.animalDisposition}
                    animalAvailability={animal.animalAvailability}
                    animalDescription={animal.animalDescription}
        />
      {/*We can display any additional details that weren't included in the card here.*/}
    </div>
  );
}

export default MoreDetails;