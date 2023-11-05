import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>PetPals Connect</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          <b>Proposed Structure:</b>
          <li>'/' - Landing Page/Navigation</li>
          <br />
          
          <b>Proposed Pets Structure:</b>
          <li>'/pets' - Page to view all available animals</li>
          <li>'/pets/:pet_id/' - Details page for one pet</li>
          <li>'/pets/create' - Add new pets to the app</li>
          <li>'/pets/edit/:pet_id' - Edit a pet in the app</li>
          <br />

          <b>Proposed Users Structure:</b>
          <li>'/users/signup' - Signup Page for New Users</li>
          <li>'/users/login' - Login Page for current users</li>
          <li>'/users/:user_id' - Details page for one user</li>
          <li>'/users/edit/:user_id' - Edit a user in the app</li>
          <br />
          
          <b>Proposed Admin Structure:</b>
          <li>'/admins/signup' - Signup page for new admins</li>
          <li>'/admins/login' - Login page for admin</li>
          <li>'/admins/:admin_id' - Details page for one admin</li>
          <li>'/admins/edit/:admin_id' - Edit an admin</li>
          <br />

        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
