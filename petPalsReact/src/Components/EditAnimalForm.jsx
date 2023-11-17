import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function EditAnimalForm({ animal }) {
  console.log(animal);
  const addSchema = yup.object().shape({
    name: yup.string().required("Animal name is required"),
    animal_type: yup.string().required("Animal type is required"),
    animal_breed: yup.string().required("Animal breed is required"),
    animal_disposition: yup.string().required("Animal disposition is required"),
    animal_desription: yup.string(),
    animal_availability: yup
      .string()
      .required("Animal availability is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(addSchema) });

  // THIS IS WHERE THE PUT REQUEST WILL GO 
  // Please feel free to ammend in any way that works for middleware integration
  //
  const onSubmit = async data => {
    console.log(data);
    try {
        // change API endpoint as needed 
        const response = await fetch('/add', {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const result = await response.json();
          alert("Thanks for submitting a new pet!")
          reset();
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
          <option value="Other"></option>
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

        <select
          placeholder="Animal Disposition..."
          {...register("animal_disposition")}
          className="input"
        >
{/* TODO: Update dispositions as needed with pets.routes.js */}
          <option value="">Select Disposition</option>
          <option value="Animal must be leashed at all times">Animal must be leashed at all times</option>
          <option value="Good with other animals">Good with other animals</option>
          <option value="Good with children">Good with children</option>
        </select>
        <p>{errors.animal_disposition?.message}</p>
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
        <input
          type="text"
          placeholder="Animal Description..."
          {...register("animal_description")}
          className="input"
          defaultValue={animal.animalDescription}
        />
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
