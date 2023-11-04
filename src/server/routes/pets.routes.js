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

  // Perform a basic select to get all animals
  showPetsQuery = 'SELECT * from Animals';

  // On Pets Card: Name, Type, Picture, Availability
  // For More Details: + Description

  // Run the query
  db.pool.query(showPetsQuery, function (err, results, fields) {
    // get all the pets in the database to pass to frontend
    if (err) throw err;  // error handling
    // send results to frontend
    res.send(results);
  })

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

petsRouter.get("/:animal_id", (req, res) => {
  // TODO: Display details for one pet when clicked on
  // perform SELECT based on animal_id
  let showAnimalQuery = `SELECT * from Animals WHERE animal_id = ${req.params.animal_id}`;

  // Run the query
  db.pool.query(showAnimalQuery, function (err, results, fields) {
    // get all the pets in the database to pass to frontend
    if (err) throw err;  // error handling
    // send results to frontend
    res.send(results);
  })
})
  
petsRouter.post("/add", (req, res) => {
  // Add a new pet to the app
  // Gets new pet info from frontend form and adds it to database
  let data = req.body;
  let name = data['name'];
  let animal_type = data['animal-type'];
  let picture = data['picture'];
  let animal_availability = data['animal-availability'];
  let description = data['description'];

  // TODO: Figure out how to send picture as picture to display on frontend?

  // Create the query and run it on the db
  const query = `INSERT INTO Animals (${name}, ${animal_type}, ${picture}, ${animal_availability}, ${description})`;
  db.pool.query(query, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/');
    }
  })
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