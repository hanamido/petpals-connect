import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import AnimalCard from "../Components/AnimalCard";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function Browse() {

// ATTN: Middleware integration
const [animals, setAnimals] = useState([]);

 useEffect(() => {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','https://petpals-connect-service.onrender.com/');

  // Fetch animal data from server's API here
  fetch("https://petpals-connect-service.onrender.com/pets", {
    mode: 'cors',
    method: 'GET',
    headers: headers
  })
     .then((response) => response.json())
     .then((data) => setAnimals(data))
     .catch((error) => console.error("Error fetching animal data:", error));
 }, []);

// END PLACEHOLDER
  return (
    <div className="cardList">
      {animals.map((animal) => {
        const {
          imgSrc,
          animalName,
          animalType,
          animalBreed,
          animalDisposition,
          animalAvailability,
          animalDescription
        } = animal;
        return (
          <AnimalCard
            imgSrc={imgSrc}
            animalName={animalName}
            animalType={animalType}
            animalBreed={animalBreed}
            animalDisposition={animalDisposition}
            animalAvailability={animalAvailability}
            animalDescription={animalDescription}
          />
        );
      })}
    </div>
  );
}

export default Browse;
