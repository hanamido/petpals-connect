import React from "react";


export default function AnimalCard(props) {
    const {imgSrc, animalName, animalType, animalBreed, animalDisposition, animalAvailability} = props;
  return (
    <div className="animalCard">
      <img
        src={imgSrc}
        alt="Animal photo"
        className="animalCardImg"
      />
      <h2 className="animalCardTitle">{animalName}</h2>
      <p className="animalCardText">
        A little bit about {animalName}:
       <ul>
        <li>Animal Type:  {animalType}</li>
        <li>Animal Breed:  {animalBreed}</li>
        <li>Animal Disposition: {animalDisposition}</li>
        <li>Availability: {animalAvailability}</li>
        </ul>
      </p>
      <button>Learn more about {animalName}</button>
    </div>
  );}
