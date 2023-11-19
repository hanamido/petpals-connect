import React from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";

function LoginForm() {
    //Auth0 can change schema as needed
  const addSchema = yup.object().shape({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    password: yup.string().min(5).required("Password is required with a minimum of 5 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(addSchema) });

  // THIS IS WHERE THE AUTH0 Changes will be made
  // Please feel free to ammend in any way that works for Auth0 integration
  // API endpoint and method can be changed
  const onSubmit = async data => {
    console.log(data);
    try {
        // Auth0 can change API and method
        const response = await fetch('http://localhost:3000/admin/add', {
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
          alert("You are now logged in!")
          navigate("/");
        } catch (error) {
            alert("Submission failed. Please try again.")
          console.error('Error with form submission', error);
        }
    }
/// END INTEGRATION SECTION

  return (
    <div className="Form">
      <h1>Login:</h1>
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
          type="password"
          placeholder="Password..."
          {...register("password")}
          className="input"
        />
        <p>{errors.shelter_name?.message}</p>


        <input type="submit" className="submitButton"/>
      </form>
    </div>
  );
}

export default LoginForm;