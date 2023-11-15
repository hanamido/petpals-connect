import React, { useState } from "react";
import "../App.css";
import AddAnimalForm from "../Components/AddAnimalForm";
import AddAdminForm from "../Components/AddAdminForm";
import AddClientForm from "../Components/AddClientForm";

function AddPet() {
  const [showAnimalForm, setShowAnimalForm] = useState(false);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showClientForm, setShowClientForm] = useState(false);

  const handleFormSubmit = () => {
    // Hide all forms after submission
    setShowAnimalForm(false);
    setShowAdminForm(false);
    setShowClientForm(false);
  };

  return (
    <div>
      <button className="submitButton" onClick={() => setShowAnimalForm(!showAnimalForm) }>Add Animal Form</button>
      <button className="submitButton" onClick={() => setShowAdminForm(!showAdminForm)}>Add Admin Form</button>
      <button className="submitButton" onClick={() => setShowClientForm(!showClientForm)}>Add Prospective Owner Form</button>

      {showAnimalForm && <AddAnimalForm onSubmit={handleFormSubmit} />}
      {showAdminForm && <AddAdminForm onSubmit={handleFormSubmit} />}
      {showClientForm && <AddClientForm onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default AddPet;
