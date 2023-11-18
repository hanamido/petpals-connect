import React from "react";
import {useNavigate} from 'react-router-dom';


export default function AnimalCard(props) {
  const navigate = useNavigate();
    const {imgSrc, animalName, animalType, animalBreed, animalDisposition, animalAvailability, animalDescription} = props;
    const moreDetails = (animal) => {
      navigate('/moreDetails', {state:{animal:animal}});
  }
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
      <button  onClick={(e)=>{moreDetails(props)}}>Learn more about {animalName}</button>
    </div>
  );}
