import React, { useState, useEffect } from "react";
import "../App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bone from "../images/bone.svg";
import user from "../images/user-regular.svg";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchValue, setSearchValue]=useState('');
    const [searchCategory, setSearchCategory] = useState('type');
    const navigate = useNavigate();
    const submitSearch = async () => {
        console.log("search", searchValue);
        try {
          let headers = new Headers();
    
          headers.append('Content-Type', 'application/json');
          headers.append('Accept', 'application/json');
    
          // change API endpoint as needed 
          const response = await fetch(`http://localhost:3000/pets/search/type?${searchCategory}=${searchValue}`, {
              mode: 'cors',
              method: 'GET',
              headers: headers,
            })
  
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
      
            const result = await response.json();
            console.log("finished searching by type");
            navigate('/searchResults', {state:{searchValue, searchCategory}});

        } catch (error) {
            alert("Submission failed. Please try again.")
          console.error('Error with form submission', error);
        }
    }

      return (
      <div className="Search">
          <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    <option value="type">Animal Type</option>
                    <option value="breed">Breed</option>
                    <option value="disposition">Disposition</option>
                </select>
        <input type="text" placeholder="Search" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
        <button onClick={submitSearch}>Go!</button>
      </div>
  );
}

export default SearchBar;