const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const clientId = process.env.API_KEY;
const clientSecret = process.env.API_SECRET;
const { 
  animalsQueries, 
  showOneAnimalQuery, 
  addAnimalQuery, 
  addAnimalDispositionQuery, addTwoAnimalDispositionQuery, addThreeAnimalDispositionQuery,
  addAnimalBreedQuery, 
  checkIfBreedExists, 
  addOtherAnimalBreed, 
  deleteAnimalQuery, 
  checkType, 
  editAnimalQuery, 
  editAnimalBreed, 
  editAnimalDisposition, 
  searchByType, searchByBreed, searchByDisposition 
} = require('../controllers/petsController');

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

petsRouter.get("/search/type", (req, res) => {
  // Display search results when user searched by type
  // Users can search by type, breed, or disposition
  const typeValue = req.query.type;
  let searchType;

  // check if the type is 'Dog', 'Cat', or 'Other'
  searchType = checkType(typeValue);
  console.log(searchType);
  let query1 = searchByType(searchType);

  db.pool.query(query1, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.send(result);
    }
  })
}); 

petsRouter.get("/search/breed", (req, res) => {
  // Display search results when user searches by breed
  const breed = req.query.breed;
  let searchBreed;

  // check for the breed
  let query1 = checkIfBreedExists(breed);
  db.pool.query(query1, function(error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      // if the breed doesn't exist, search by "Other"
      if (result.length === 0) {
        searchBreed = "Other";
        let query2 = searchByBreed(searchBreed);
        db.pool.query(query2, function(error, result, fields) {
          if (error) {
            console.log(error);
          } else {
            res.send(result);
          }
        })
      } else { // else the breed exists so just use the `breed` query parameters
        searchBreed = breed;
        let query2 = searchByBreed(searchBreed); 
        db.pool.query(query2, function(error, result, fields) {
          if (error) {
            console.log(error);
          } else {
            res.send(result);
          }
        })
      }
    }
  })
})

petsRouter.get("/search/disposition", (req, res) => {
  // Display search results when user searches by disposition
  const disposition = req.query.disposition;

  // Construct the query
  let query1 = searchByDisposition(disposition);
  db.pool.query(query1, function(error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  }) 
})

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
  let animal_description = data['animal_description'];
  //  are sent as a boolean string ("true"/"false") due to the checkbox format
  let disposition1 = data['animal_disposition1'];
  let disposition2 = data['animal_disposition2'];
  let disposition3 = data['animal_disposition3'];
  let animal_breed = data['animal_breed'];

  let addQuery2;
  let animalId;
  let values = [];

  // Create the general add query and run it on the db
  let addQuery = addAnimalQuery(name, animal_type, picture, animal_availability, animal_description);

  db.pool.query(addQuery, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      animalId = result.insertId
      // If only disposition1 is checked, only add that one
      if (disposition1 !== "false" && disposition2 === "false" && disposition3 === "false") {
        addQuery2 = addAnimalDispositionQuery(animalId);
        values = [disposition1];
      } 
      else if (disposition2 !== "false" && disposition1 === "false" && disposition3 === "false") {
        // if only disposition 2 is checked, only add that one
        addQuery2 = addAnimalDispositionQuery(animalId);
        values = [disposition2];
      } 
      else if (disposition3 !== "false" && disposition1 === "false" && disposition2 === "false") {
        // If only disposition3 is checked, only add it
        addQuery2 = addAnimalDispositionQuery(animalId);
        values = [disposition3];
      } 
      else if (disposition1 !== "false" && disposition2 !== "false" && disposition3 === "false") {
        // If only disposition1 and disposition2 are checked, only add disposition1 and disposition2
        addQuery2 = addTwoAnimalDispositionQuery(animalId);
        values = [disposition1, disposition2];
      } 
      else if (disposition1 !== "true" && disposition2 === "false" && disposition3 !== "false") {
        // If only disposition1 and disposition3 are checked, only add those two
        addQuery2 = addTwoAnimalDispositionQuery(animalId);
        values = [disposition1, disposition3];
      } 
      else if (disposition1 === "false" && disposition2 !== "false" && disposition3 !== "false") {
        // If only disposition2 and disposition3 are checked, only add those two
        addQuery2 = addTwoAnimalDispositionQuery(animalId);
        values = [disposition2, disposition3];
      } 
      else {  // if all dispositions are selected
        addQuery2 = addThreeAnimalDispositionQuery(animalId);
        values = [disposition1, disposition2, disposition3];
      }

      // Get animal dispositions and add it to Animal_Dispositions
        db.pool.query(addQuery2, values, function(error, result, fields) {
        if (error) {
          console.log(error);
          res.sendStatus(400);
        } else {
          // Checks if the breed is already in the db
          let addQuery3 = checkIfBreedExists(animal_breed);
          // placeholder query
          let addQuery4;
          db.pool.query(addQuery3, function(error, result, fields) {
            if (error) {
              console.log(error);
              res.sendStatus(400);
            } else {
              console.log(result);
              // if the breed (dog or cat) is not in the db, add it as "Other"
              const isEmptySet = result.length === 0;
              // if the type is not a 'Dog' or 'Cat', add animalBreed and animalType as "Other"
              const animalType = checkType(animal_type);
              if (isEmptySet) {
                addQuery4 = addOtherAnimalBreed(animalId, animalType);
                // then add to Animal_Breeds
                db.pool.query(addQuery4, function(error, result, fields) {
                  if (error) {
                    console.log(error)
                  } else {
                    res.send(result);
                  }
                })
              } else {
                // otherwise go straight into adding to Animal_Breeds
                addQuery4 = addAnimalBreedQuery(animalId, animal_breed, animalType);
                db.pool.query(addQuery4, function(error, result, fields) {
                  if (error) {
                    console.log(error);
                  } else {
                    res.send(result)
                  }
                })
              }
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
  let data = req.body;
  let name = data['name'];
  let animal_type = data['animal_type'];
  let picture = data['picture'];
  let animal_availability = data['animal_availability'];
  let animal_description = data['animal_description'];
  let animal_disposition = data['animal_disposition'];
  let animal_breed = data['animal_breed'];

  // Declare general edit query
  let query1 = editAnimalQuery(req.params.animal_id, name, animal_type, picture, animal_availability, animal_description)

  // First send the query to update the animal
  db.pool.query(query1, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      const query2 = editAnimalBreed(req.params.animal_id, animal_breed);
      // Then update breeds through Animal_Breeds table
      db.pool.query(query2, function(error, result, fields) {
        console.log(result);
        res.sendStatus(200);
      })
    }
  })

  // TODO: check what format dispositions can be added as, perhaps disposition1, disposition2, disposition3? 

  // TODO: Check if the disposition is already associated with the animal_id

  // TODO: If that disposition is checked, remove it
  
  // TODO: Otherwise, add it to the animal_id

})

petsRouter.delete("/delete/:animal_id", (req, res) => {
  // Delete a pet given the animal ID
  // Send the new pet data to frontend
  let deleteQuery = deleteAnimalQuery(req.params.animal_id)
  db.pool.query(deleteQuery, function (error, result, fields) {
    if (error) {
      console.log(error);
    } else {
      res.send(result);
    }
  })
})

module.exports = {
  petsRouter: petsRouter
}