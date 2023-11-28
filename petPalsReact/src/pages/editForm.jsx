import { useLocation } from "react-router-dom";
import React from "react";
import "../App.css";
import EditAnimalForm from "../Components/EditAnimalForm";
import ViewAnimalData from "../Components/EditAnimal";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function EditForm() {
  const location = useLocation();
  const animal = location.state.animal;
  console.log(animal);
  return (
    <div>
      <h1>Editing {animal.animalName}</h1>
      {/*Might need to update to pass animal id to EditAnimal Form?*/}
      <EditAnimalForm animal={animal} />
    </div>
  );
}

export default EditForm;
