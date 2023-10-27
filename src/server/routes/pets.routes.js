const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const clientId = process.env.API_KEY;
const clientSecret = process.env.API_SECRET;

// Database stuff
const db = require('../database/db-connector');

const petsRouter = express.Router();

/* PETS ROUTES */
petsRouter.get("/", async (req, res) => {
  // Display all pets in the app (get data from database to pass to frontend)
  // Declare query1
  let showPetsQuery;

  // if there is no query string, perform a basic SELECT
  showPetsQuery = 'SELECT * from Pets';

  // On Pets Card: Species, Name, Color(s), Age
  // For More Details:  Gender, Size, Coat, Tags, Contact Info for Shelter

  // Run the query
  // db.pool.query(showPetsQuery, function (err, results, fields) {
  //   // get all the pets in the database to pass to frontend
  //   if (err) throw err;  // error handling
  //   // send results to frontend
  //   res.send(results);
  // })

  /* GETS THE DATA FROM PETFINDERS API */
  // Get the access token from the API
  try {
    const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret
    });

    const accessToken = response.data.access_token;

    // Get the pets data from the API
    try {
      const response = await axios.get('https://api.petfinder.com/v2/animals?type=cat', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }});
      const apiData = response.data;
      res.json(apiData);
    } catch (err) {
      console.log("Error retrieving pets from API: ", err)
    }

  } catch (err) {
    console.log("Error retrieving pets from API: ", err)
  }
})

petsRouter.get("/search/:query", (req, res) => {
  // Display a pet based on the search parameter
}); 

petsRouter.get("/:pet_id", (req, res) => {
  // TODO: Display details for one pet when clicked on
  // Declare query1
  let showPetQuery;

  // perform SELECT based on pet_id
  showPetQuery = `SELECT * from Pets WHERE pet_id = ${req.params.pet_id}`;

  // Run the query
  // db.pool.query(showPetsQuery, function (err, results, fields) {
  //   // get all the pets in the database to pass to frontend
  //   if (err) throw err;  // error handling
  //   // send results to frontend
  //   res.send(results);
  // })
})
  
petsRouter.post("/add", (req, res) => {
  // Add a new pet to the app
  // Gets new pet info from frontend form and adds it to database
})

petsRouter.put("/edit/:pet_id", (req, res) => {
  // Edit a pet given the pet ID
  // Send the new pet data to frontend
})

petsRouter.delete("/delete/:pet_id", (req, res) => {
  // Delete a pet given the pet ID
  // Send the new pet data to frontend
})

module.exports = {
  petsRouter: petsRouter
}