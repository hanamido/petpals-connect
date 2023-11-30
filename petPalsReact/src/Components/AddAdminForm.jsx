import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function AddAdminForm() {
  const addSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    shelter_name: yup.string().required("Shelter name is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(addSchema) });

  // THIS IS WHERE THE POST REQUEST WILL GO 
  // Please feel free to ammend in any way that works for middleware integration
  //
  const onSubmit = async data => {
    console.log(data);
    try {
        // change API endpoint as needed 
        const response = await fetch('https://petpals-connect-service.onrender.com/admin/add', {
            mode: 'cors',
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const result = await response.json();
          alert("Thanks for submitting a new administrator!")
          reset();
        } catch (error) {
            alert("Submission failed. Please try again.")
          console.error('Error with form submission', error);
        }
    }
/// END INTEGRATION SECTION

  return (
    <div className="Form">
      <h1>Add a new administrator:</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
       
        <input
          type="text"
          placeholder="First name..."
          {...register("first_name")}
          className="input"
        />
        <p>{errors.first_name?.message}</p>

        <input
          type="text"
          placeholder="Last name..."
          {...register("last_name")}
          className="input"
        />
        <p>{errors.last_name?.message}</p>

        <input
          type="text"
          placeholder="Shelter name..."
          {...register("shelter_name")}
          className="input"
        />
        <p>{errors.shelter_name?.message}</p>


        <input type="submit" className="submitButton"/>
      </form>
    </div>
  );
}

export default AddAdminForm;