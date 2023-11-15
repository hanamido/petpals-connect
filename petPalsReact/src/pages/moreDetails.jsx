import { useLocation } from "react-router-dom";
import React from "react";
import "../App.css";
import EditAnimalForm from "../Components/EditAnimalForm";
import ViewAnimalData from "../Components/EditAnimal";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function MoreDetails() {
  const location = useLocation();
  const animal = location.state.animal;
  console.log(animal);
  return (
    <div>
      <h1>More Details For {animal.animalName}</h1>
      {/*We can display any additional details that weren't included in the card here.*/}
    </div>
  );
}

export default MoreDetails;