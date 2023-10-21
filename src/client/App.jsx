import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          <b>Proposed Pages Structure:</b>
          <li>'/': Home Page</li>
          <li>'/pets': Page to view all available animals</li>
          <li>'/signup': Signup Page for New Users</li>
          <li>'/signin': Sign-in Page for current users</li>
          <li>'/admin-signin': Sign-in page for admin (for shelters to add animals?)</li>
          <li>'/admin-signup': Sign-up page for new admins</li>
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
