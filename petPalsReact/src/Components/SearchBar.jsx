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
    const [searchResults, setSearchResults] = useState([]);
    const [didPressReset, setDidPressReset] = useState(false);

    const navigate = useNavigate();
    const submitSearch = () => {
        console.log("search", searchValue);
        navigate('/searchResults', {state:{ searchValue, searchCategory }});
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