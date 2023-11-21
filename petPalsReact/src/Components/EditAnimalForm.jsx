import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";
import { useNavigate } from "react-router-dom";

function EditAnimalForm({ animal }) {
  const addSchema = yup.object().shape({
    name: yup.string().required("Animal name is required"),
    animal_type: yup.string().required("Animal type is required"),
    animal_breed: yup.string().required("Animal breed is required"),
    animal_disposition1: yup.string().required("Animal disposition is required"),
    animal_disposition2: yup.string(),
    animal_disposition3: yup.string(),
    animal_description: yup.string(),
    picture: yup.mixed(),
    animal_availability: yup
      .string()
      .required("Animal availability is required"),
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(addSchema) });

  // Check whether the animal disposition is checked or not
  const checkAnimalDisposition = (dispositionDesc) => {
    // split the animal dispositions
    const animalDispositions = animal.animalDisposition.split(",");
    // if the disposition is currently in the array, then return true
    if (animalDispositions.includes(dispositionDesc)) {
      return true;
    } 
    return false;
  }

  // THIS IS WHERE THE PUT REQUEST WILL GO 
  // Please feel free to ammend in any way that works for middleware integration
  //
  const onSubmit = async data => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("animal_type", data.animal_type);
    formData.append("animal_breed", data.animal_breed);
    formData.append("animal_disposition1", data.animal_disposition1);
    formData.append("animal_disposition2", data.animal_disposition2);
    formData.append("animal_disposition3", data.animal_disposition3);
    formData.append("animal_description", data.animal_description);
    formData.append("animal_availability", data.animal_availability);
    formData.append("picture", data.picture[0]);

    try {
      console.log(animal.animal_id);
        // change API endpoint as needed 
        const response = await fetch(`http://localhost:3000/pets/edit/${animal.animal_id}`, {
            mode: 'cors',
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
            },
            body: formData,
          })
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          } else {
            alert("Pet has been edited!");
            navigate("/delete");
          }

        } catch (error) {
            alert("Submission failed. Please try again.")
          console.error('Error with form submission', error);
        }
    }
/// END INTEGRATION SECTION

  return (
    <div className="Form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("name")}
          className="input"
          defaultValue={animal.animalName}
        />
        <p>{errors.name?.message}</p>
        <select
          placeholder="Animal Type..."
          {...register("animal_type")}
          className="input"
        >
          <option value="">Select Animal Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
        <p>{errors.animal_type?.message}</p>
{/* TODO: update foreign key */}
        <input
          type="text"
          placeholder="Animal Breed..."
          {...register("animal_breed")}
          className="input"
          defaultValue={animal.animalBreed}
        />
        <p>{errors.animal_breed?.message}</p>

{/* TODO: update foreign key */}
        <select
          placeholder="Animal Availability..."
          {...register("animal_availability")}
          className="input"
        >
          <option value="">Select Animal Availablily</option>
          <option value="Available">Available</option>
          <option value="Pending">Pending</option>
          <option value="Adopted">Adopted</option>
        </select>
        <p>{errors.animal_availability?.message}</p>
        <textarea
          placeholder="Animal Description..."
          {...register("animal_description")}
          className="input"
          defaultValue={animal.animalDescription}
          rows={4} cols={50}
        />

{/*Animal Disposition - might need to change integration with register values due to checkbox formatting */}
<div className="checkboxContainer">
<label className="checkboxLabel">
  <h3>Animal Disposition:</h3>
        <input 
            type="checkbox" 
            value="Animal must be leashed at all times" 
            defaultChecked={checkAnimalDisposition("Animal must be leashed at all times")}
            {...register("animal_disposition1")}
        />
        Animal must be leashed at all times
    </label>
    <label className="checkboxLabel">
        <input 
            type="checkbox" 
            value="Good with other animals" 
            defaultChecked={checkAnimalDisposition("Good with other animals")}
            {...register("animal_disposition2")}
        />
        Good with other animals
    </label>
    <label className="checkboxLabel">
        <input 
            type="checkbox" 
            value="Good with children" 
            defaultChecked={checkAnimalDisposition("Good with children")}
            {...register("animal_disposition3")}
        />
        Good with children
    </label>
    </div>
        <p>{errors.animal_disposition?.message}</p>

      
        <div className="input">
          <label>Upload photo (optional): </label>
          <input
            type="file"
            placeholder="Upload photo (optional)"
            {...register("picture")}
            className="input"
          />
        </div>
        <input type="submit" className="submitButton"/>
      </form>
    </div>
  );
}

export default EditAnimalForm;
