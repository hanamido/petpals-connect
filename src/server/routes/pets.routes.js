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
  searchByType, searchByBreed, searchByDisposition  } = require('../controllers/petsController');

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
  const type = req.query;
  let searchType;

  // check if the type is 'Dog', 'Cat', or 'Other'
  searchType = checkType(type) ? type : "Other";
  let query1 = searchByType(searchType);

  db.pool.query(query1, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    res.send(result);
  })
}); 

petsRouter.get("/search/breed", (req, res) => {
  // Display search results when user searches by breed
  const breed = req.query;
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
        let query2 = searchBreed(searchBreed);
        db.pool.query(query2, function(error, result, fields) {
          if (error) {
            console.log(error);
          } else {
            res.send(result);
          }
        })
      } else { // else the breed exists so just use the `breed` query parameters
        searchBreed = breed;
        let query2 = searchBreed(searchBreed); 
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
  const disposition = req.query;

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
  // TODO: See what format dispositions will be sent as, maybe as disposition1, disposition2, disposition3
  let animal_disposition = data['animal_disposition'];
  let disposition2 = data['animal_disposition2'];
  let disposition3 = data['animal_disposition3'];
  let animal_breed = data['animal_breed'];

  let addQuery2;
  let animalId;

  // Create the general add query and run it on the db
  let addQuery = addAnimalQuery(name, animal_type, picture, animal_availability, animal_description);

  db.pool.query(addQuery, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      animalId = result.insertId
        // If there is nothing listed in both disposition2 and disposition3, only add the first disposition
        if (disposition2.length === 0 && disposition3.length == 0) {
          addQuery2 = addAnimalDispositionQuery(animalId, animal_disposition);
        } else if (disposition2.length === 0) {
          addQuery2 = addTwoAnimalDispositionQuery(animalId, animal_disposition, disposition3);
        } else if (disposition3.length == 0) {
          addQuery2 = addTwoAnimalDispositionQuery(animalId, animal_disposition, disposition2);
        } else {  // if all dispositions are selected
          addQuery2 = addThreeAnimalDispositionQuery(animalId, animal_disposition, disposition2, disposition3)
        }

      // Get animal dispositions and add it to Animal_Dispositions
      db.pool.query(addQuery2, function(error, result, fields) {
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
              // if it is not a dog or cat, add it as "Other" for type and breed
              if (!checkType(animal_type)) {
                animal_breed = "Other"
                animal_type = "Other"
              }
              if (isEmptySet) {
                addQuery4 = addOtherAnimalBreed(animalId, animal_breed, animal_type)
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
                addQuery4 = addAnimalBreedQuery(animalId, animal_breed, animal_type);
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

  // Update dispositions through Animal_Dispositions table
  // TODO: check what format dispositions can be added as, perhaps disposition1, disposition2, disposition3? 

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