import React, { useState } from "react";
import "../App.css";
import CreateAccountForm from "../Components/CreateAccountForm";
import LoginForm from "../Components/LoginForm";
import LoginButton from "../Components/LoginWithAuth0Button";
import LogoutButton from "../Components/LogoutButton";


function Account() {
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleFormSubmit = () => {
    // Hide all forms after submission
    setShowCreateAccountForm(false);
    setShowLoginForm(false);
  };

  const loginWithAuth0 = async () => {
    try {
      window.location.href = 'https://petpals-connect-service.onrender.com/login'
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="loginContainer">
      <button className="submitButton" onClick={() => setShowCreateAccountForm(!showCreateAccountForm) }>Sign Up</button>
      <button className="submitButton" onClick={() => setShowLoginForm(!showLoginForm)}>Login</button>
      <div>
        <LoginButton />
      </div>
      <div>
        <LogoutButton />
      </div>
      <div></div>

      {showCreateAccountForm && <CreateAccountForm onSubmit={handleFormSubmit} />}
      {showLoginForm && <LoginForm onSubmit={handleFormSubmit} />}
    </div>
  );
}

export default Account;