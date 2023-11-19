import React, { useState } from "react";
import "../App.css";
import CreateAccountForm from "../Components/CreateAccountForm";
import LoginForm from "../Components/LoginForm";


function Account() {
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleFormSubmit = () => {
    // Hide all forms after submission
    setShowCreateAccountForm(false);
    setShowLoginForm(false);
  };

  return (
    <div className="loginContainer">
      <button className="submitButton" onClick={() => setShowCreateAccountForm(!showCreateAccountForm) }>Sign Up</button>
      <button className="submitButton" onClick={() => setShowLoginForm(!showLoginForm)}>Login</button>


      {showCreateAccountForm && <CreateAccountForm onSubmit={handleFormSubmit} />}
      {showLoginForm && <LoginForm onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default Account;