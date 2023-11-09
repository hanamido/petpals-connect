import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import AnimalCard from "../Components/AnimalCard";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

///This is just placeholder data until we integrate with middleware
// const animals = [
//   {
//     imgSrc:
//       "https://images.pexels.com/photos/1933464/pexels-photo-1933464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     animalName: "Kai",
//     animalType: "Dog",
//     animalBreed: "Chihuahua",
//     animalDisposition: "Good with children",
//     animalAvailability: "Available",
//   },
//   {
//     imgSrc:
//       "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     animalName: "Margo",
//     animalType: "Cat",
//     animalBreed: "Mix",
//     animalDisposition: "Independant",
//     animalAvailability: "Available",
//   },
//   {
//     imgSrc:
//       "https://images.pexels.com/photos/6754125/pexels-photo-6754125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     animalName: "Anabelle",
//     animalType: "Cat",
//     animalBreed: "Mix",
//     animalDisposition: "Good with cats",
//     animalAvailability: "Available",
//   },
//   {
//     imgSrc:
//       "https://images.pexels.com/photos/15347387/pexels-photo-15347387/free-photo-of-a-dog-in-close-up-shot.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     animalName: "Marble",
//     animalType: "Dog",
//     animalBreed: "Collie Mix",
//     animalDisposition: "Active",
//     animalAvailability: "Available",
//   },
//   {
//     imgSrc:
//       "https://images.pexels.com/photos/164186/pexels-photo-164186.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     animalName: "Earl",
//     animalType: "Dog",
//     animalBreed: "Corgi",
//     animalDisposition: "Couch potato",
//     animalAvailability: "Available",
//   },
//   {
//     imgSrc:
//       "https://images.pexels.com/photos/1289557/pexels-photo-1289557.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     animalName: "Jake",
//     animalType: "Dog",
//     animalBreed: "Pug",
//     animalDisposition: "Affectionate",
//     animalAvailability: "Available",
//   },
// ];


function Browse() {

// ATTN: Middleware integration
///This is potenially where the data can be fetched from our API endpoint. 
// Commenting it out as it is a placeholder
const [animals, setAnimals] = useState([]);

 useEffect(() => {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','http://localhost:3000');

  // Fetch animal data from your server's API here
  fetch("http://localhost:3000/pets", {
    mode: 'cors',
    method: 'GET',
    headers: headers
  }) // Replace with your actual API endpoint
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
        } = animal;
        return (
          <AnimalCard
            imgSrc={imgSrc}
            animalName={animalName}
            animalType={animalType}
            animalBreed={animalBreed}
            animalDisposition={animalDisposition}
            animalAvailability={animalAvailability}
          />
        );
      })}
    </div>
  );
}

export default Browse;
