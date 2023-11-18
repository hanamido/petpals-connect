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
      <ul>
        <li>Animal Type:  {animal.animalType}</li>
        <li>Animal Breed:  {animal.animalBreed}</li>
        <li>Animal Disposition: {animal.animalDisposition}</li>
        <li>Availability: {animal.animalAvailability}</li>
        <li>Description: {animal.animalDescription}</li>
        </ul>
      {/*We can display any additional details that weren't included in the card here.*/}
    </div>
  );
}

export default MoreDetails;