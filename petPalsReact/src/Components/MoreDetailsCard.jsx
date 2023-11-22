import React from "react";
import {useNavigate} from 'react-router-dom';
import noImage from "../images/noImage.jpeg";



export default function MoreDetailsCard(props) {
  const navigate = useNavigate();
    const {imgSrc, animalName, animalType, animalBreed, animalDisposition, animalAvailability, animalDescription} = props;
    const moreDetails = (animal) => {
      navigate('/moreDetails', {state:{animal:animal}});
  }

  const handleImgError = (e) => {
    e.target.src = noImage; 
  }
  return (
    <div className="moreDetailsCard">
      <img
        src={imgSrc}
        alt="Animal photo"
        className="animalCardImg"
        onError={handleImgError}
      />
      <h2 className="animalCardTitle">{animalName}</h2>
      <p className="animalCardText">
        More about {animalName}:
       <ul>
        <li>Animal Type:  {animalType}</li>
        <li>Animal Breed:  {animalBreed}</li>
        <li>Animal Disposition: {animalDisposition}</li>
        <li>Availability: {animalAvailability}</li>
        <li>Description: {animalDescription}</li>
        </ul>
      </p>
    </div>
  );}