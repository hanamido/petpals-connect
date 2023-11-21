import React, { useState } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";
import { useRef } from "react";

function AddAnimalForm() {

  const addSchema = yup.object().shape({
    name: yup.string().required("Animal name is required"),
    animal_type: yup.string().required("Animal type is required"),
    animal_breed: yup.string().required("Animal breed is required"),
    animal_disposition1: yup.string().required("Animal disposition is required"),
    animal_disposition2: yup.string(),
    animal_disposition3: yup.string(),
    animal_description: yup.string(),
    picture: yup
      .mixed(),
      // .test('fileType', 'Invalid file type', (value) => {
      //   return value && ['image.jpeg', 'image.jpg', 'image.png'].includes(value.type);
      // }),
    animal_availability: yup
      .string()
      .required("Animal availability is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(addSchema) });

  // THIS IS WHERE THE POST REQUEST WILL GO 
  // Please feel free to ammend in any way that works for middleware integration
  //
  const onSubmit = async (data) => {

    console.log(data);

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
      let headers = new Headers();
      headers.append('Accept', 'application/json');

        // change API endpoint as needed 
        // const response = await fetch('http://localhost:3000/pets/upload-pic', {
        //   mode: 'cors',
        //   method: 'POST',
        //   headers: headers,
        //   body: formData
        // })
        // const imageData = await response.json();
        // console.log(imageData);

        // // add the image to data
        // data.picture = imageData.imagePath;
        // console.log(data);

        const addResponse = await fetch('http://localhost:3000/pets/add', {
          mode: 'cors',
          method: 'POST',
          headers: headers,
          body: formData,
        })

        // if (!addResponse.ok) {
        //   throw new Error(`Error: ${addResponse.status}`);
        // }
  
        const result = await addResponse.json();
        alert("Thanks for submitting a new pet!")
        reset();
        
        // const response = await fetch('http://localhost:3000/pets/add', {
        //     mode: 'cors',
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(data),
        //   })

        //   if (!response.ok) {
        //     throw new Error(`Error: ${response.status}`);
        //   }
    
        //   const result = await response.json();
        //   alert("Thanks for submitting a new pet!")
        //   reset();
        } catch (error) {
            alert("Submission failed. Please try again.")
          console.error('Error with form submission', error);
        }
    }
/// END INTEGRATION SECTION

  return (
    <div className="Form">
      <h1>Add a new pet:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Animal Name..."
          {...register("name")}
          className="input"
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

{/*Animal Disposition - might need to change integration with register values due to checkbox formatting */}
<div className="checkboxContainer">
<label className="checkboxLabel">
  <h3>Animal Disposition:</h3>
        <input 
            type="checkbox" 
            value="Animal must be leashed at all times" 
            {...register("animal_disposition1")}
        />
        Animal must be leashed at all times
    </label>
    <label className="checkboxLabel">
        <input 
            type="checkbox" 
            value="Good with other animals" 
            {...register("animal_disposition2")}
        />
        Good with other animals
    </label>
    <label className="checkboxLabel">
        <input 
            type="checkbox" 
            value="Good with children" 
            {...register("animal_disposition3")}
        />
        Good with children
    </label>
    </div>
        <p>{errors.animal_disposition1?.message}</p>


{/*Animal Description */}
<div className="checkboxContainer">
        <textarea
          type="text"
          placeholder="Animal Description..."
          {...register("animal_description")}
          className="input"
          rows={4} cols={50}
        />
        </div>
        <div className="input">
          <label>Upload photo (optional): </label>
          <input
            type="file"
            name="picture"
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

export default AddAnimalForm;
