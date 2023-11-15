const express = require('express');
const dotenv = require('dotenv').config();
const axios = require('axios');
const clientId = process.env.API_KEY;
const clientSecret = process.env.API_SECRET;
const { animalsQueries, showOneAnimalQuery, addAnimalQuery, addAnimalDispositionQuery, addAnimalBreedQuery, checkIfBreedExists } = require('../controllers/petsController');

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
  let animal_type = data['animal_type'];
  let picture = data['picture'];
  let animal_availability = data['animal_availability'];
  let animal_description = data['description'];
  let animal_disposition = data['animal_disposition'];
  let animal_breed = data['animal_breed'];

  // Create the general add query and run it on the db
  let addQuery = addAnimalQuery(name, animal_type, picture, animal_availability, animal_description);

  db.pool.query(addQuery, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      console.log(result);
      const animalId = result.insertId

      // Get animal dispositions and add it to Animal_Dispositions
      let addQuery2 = addAnimalDispositionQuery(animalId, animal_disposition);
      db.pool.query(addQuery2, function(error, result, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          console.log(result);
          // get animal breed and add it to the Animal_Breeds table
          let addQuery3 = addAnimalBreedQuery(animalId, animal_breed);
          // TODO: check if breed is already in db
          db.pool.query(addQuery3, function(error, result, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              console.log(result);
              res.send(result);
            }
          })
        }
      })
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