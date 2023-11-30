import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function AddClientForm() {
  const addSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    phone_number: yup.string().required("Phone number is required"),
    email: yup.string().required("E-mail is required"),
    street: yup.string(),
    city: yup.string(),
    state: yup.string(),
    zip_code: yup.string(),
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
        const response = await fetch('https://petpals-connect-service.onrender.com/users/add', {
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
          alert("Thanks for submitting a new prospective owner!")
          reset();
        } catch (error) {
            alert("Submission failed. Please try again.")
          console.error('Error with form submission', error);
        }
    }
/// END INTEGRATION SECTION

  return (
    <div className="Form">
      <h1>Add a new prospective client:</h1>
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
          type="tel"
          placeholder="Phone number..."
          {...register("phone_number")}
          className="input"
        />
        <p>{errors.phone_number?.message}</p>

        <input
          type="email"
          placeholder="email..."
          {...register("email")}
          className="input"
        />
        <p>{errors.email?.message}</p>

{/* I didn't think the follow inputs needed to be mandatory, but we can change*/}
        <input
          type="text"
          placeholder="Street Address"
          {...register("street")}
          className="input"
        />

<input
          type="text"
          placeholder="City"
          {...register("city")}
          className="input"
        />

<input
          type="text"
          placeholder="State"
          {...register("state")}
          className="input"
        />

<input
          type="text"
          placeholder="Zip Code"
          {...register("zip_code")}
          className="input"
        />

        <input type="submit" className="submitButton"/>
      </form>
    </div>
  );
}

export default AddClientForm;