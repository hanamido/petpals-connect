import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import AnimalCard from "../Components/AnimalCard";
import { useLocation } from 'react-router-dom';
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function SearchResults() {

  // Receiving search cateogory and search value from search bar function
  const location = useLocation();
  const{searchValue} = location.state || {};
  const{searchCategory} = location.state || {};
  
  const [animals, setAnimals] = useState([]);
  const baseUrl = "http://localhost:3000/pets/search";
  let url;
  // Setting up API endpoint with variables
  switch (searchCategory){
    case 'type':
        url=`${baseUrl}/type?type=${encodeURIComponent(searchValue)}`;
        break;
    case 'breed':
        url=`${baseUrl}/breed?breed=${encodeURIComponent(searchValue)}`;
        break;
    case 'disposition':
        url=`${baseUrl}/disposition?disposition=${encodeURIComponent(searchValue)}`;
        break;
  }

  useEffect(() => {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  fetch(url, {
    mode: 'cors',
    method: 'GET',
    headers: headers
  }) 
    .then((response) => response.json())
    .then((data) => setAnimals(data))
    .catch((error) => console.error("Error fetching animal data:", error));
  }, []);

  return (
      <div><h1>Results for {searchCategory} as {searchValue}</h1>
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
    </div>
  );
}

export default SearchResults;
