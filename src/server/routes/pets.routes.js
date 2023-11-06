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

  // Perform a select to get all animals
  showPetsQuery = 'SELECT * from Animals';
  showAllQuery = 'SELECT Animals.animal_id, Animals.name, Breeds.breed_name as animal_type, Animals.picture, Availability_Options.description as animal_availability, Animals.description, Dispositions.description as dispositions \
  FROM ((Animals \
          INNER JOIN Animal_Breeds ON Animal_Breeds.animal_id = Animals.animal_id) \
          INNER JOIN Breeds ON Animal_Breeds.breed_id = Breeds.breed_id \
          INNER JOIN Animal_Dispositions on Animal_Dispositions.animal_id = Animals.animal_id \
          INNER JOIN Dispositions ON Animal_Dispositions.disposition_id = Dispositions.disposition_id \
         INNER JOIN Availability_Options ON Animals.animal_availability = Availability_Options.availability_id);';

  // On Pets Card: Name, Type, Picture, Availability
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
  // TODO: Get foreign key animal_type from Animal_Breeds
  let animal_type = data['animal-type'];
  let picture = data['picture'];
  // TODO: Get foreign key animal_availability from Availability_Options
  let animal_availability = data['animal-availability'];
  let description = data['description'];
  // TODO: Add dispositions to the pets

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
  let deletePetQuery = `DELETE FROM Animals WHERE animal_id = ${req.params.pet_id}`;
  // Send the new pet data to frontend
  // db.pool.query(deletePetQuery, function (error, rows, fields) ...)
})

module.exports = {
  petsRouter: petsRouter
}