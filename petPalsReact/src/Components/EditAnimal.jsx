import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

function ViewAnimalData() {
    // ATTN: Middleware integration
    // This is potentially where the data can be fetched from our API endpoint. 
    const [animals, setAnimals] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      let headers = new Headers();
  
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      headers.append('Origin','https://petpals-connect-service.onrender.com');
  
      //
      fetch("https://petpals-connect-service.onrender.com/pets", {
        mode: 'cors',
        method: 'GET',
        headers: headers
      }) 
         .then((response) => response.json())
         .then((data) => setAnimals(data))
         .catch((error) => console.error("Error fetching animal data:", error));
    }, []);
  

    const {
        register,
        handleSubmit,
        reset
      } = useForm();
    
      // THIS IS WHERE THE DELETE REQUEST WILL GO 
      // Please feel free to ammend in any way that works for middleware integration
      // Probably replace data with animal.id?
      const onSubmit = async (data) => {
        console.log(data);
        try {
            // change API endpoint and animal.id variable as needed 
            const response = await fetch(`https://petpals-connect-service.onrender.com/pets/delete/${data.animal_id}`, {
                mode: 'cors',
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
        
              if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
              }
        
              const result = await response.json()
                .then(result => {
                  alert("Pet has been deleted!");
                })
              navigate("/");

            } catch (error) {
              console.error('Error with form submission', error);
            }
        }
    /// END INTEGRATION SECTION

    const editForm = (animal) => {
        navigate('/editForm', {state:{animal:animal}});
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <table className="editTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Breed</th>
            <th>Disposition</th>
            <th>Availability</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.animal_id}>
              <td>{animal.animalName}</td>
              <td>{animal.animalType}</td>
              <td>{animal.animalBreed}</td>
              <td>{animal.animalDisposition}</td>
              <td>{animal.animalAvailability}</td>
              {/* Replace animal with other variables as needed*/}
              <td><button  onClick={(e)=>{editForm(animal)}}>Edit</button></td>
              {/* Replace animal with animal.id variable*/}
              <td><button onClick={(e)=>{onSubmit(animal)}} >Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </form>
    );
  }

  export default ViewAnimalData;