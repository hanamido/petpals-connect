const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const clientId = process.env.API_KEY;
const clientSecret = process.env.API_SECRET;
const { animalsQueries, showOneAnimalQuery } = require('../controllers/petsController');

// Database stuff
const db = require('../database/db-connector');
const petsRouter = express.Router();

/* PETS ROUTES */
petsRouter.get("/", (req, res) => {
  // Display all pets in the app (get data from database to pass to frontend)
  // Perform a select to get all animals
  let showAllQuery = animalsQueries.showAllAnimalsQuery;

  // On Pets Card: Name, Type, Breed, Picture, Availability, Dispositions
  // For More Details: + Description

  // Run the query
  db.pool.query(showAllQuery, function (err, results, fields) {
    // get all the pets in the database to pass to frontend
    if (err) throw err; 
    res.send(results);
  })
})

petsRouter.get("/search/:query", (req, res) => {
  // Display a pet based on the search parameter
}); 

petsRouter.get("/:animal_id", (req, res) => {
  // perform SELECT based on animal_id
  let showAnimalQuery = showOneAnimalQuery(req.params.animal_id);

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
  // TODO: Get foreign key animal_type from Animal_Breeds
  let animal_type = data['animal-type'];
  let picture = data['picture'];
  // TODO: Get foreign key animal_availability from Availability_Options
  let animal_availability = data['animal-availability'];
  let description = data['description'];
  // TODO: Add dispositions to the pets

  // Create the query and run it on the db
  const query = `INSERT INTO Animals (${name}, ${animal_type}, ${picture}, ${animal_availability}, ${description})`;
  db.pool.query(query, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect('/');
    }
  })
})

petsRouter.put("/edit/:animal_id", (req, res) => {
  // Edit a pet given the pet ID
  // Send the new pet data to frontend
})

petsRouter.delete("/delete/:animal_id", (req, res) => {
  // Delete a pet given the animal ID
  let deletePetQuery = `DELETE FROM Animals WHERE animal_id = ${req.params.animal_id}`;
  // Send the new pet data to frontend
  // db.pool.query(deletePetQuery, function (error, rows, fields) ...)
})

module.exports = {
  petsRouter: petsRouter
}