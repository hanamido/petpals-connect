const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv').config();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
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
  deleteOneAnimalDisposition,
  deleteTwoAnimalDispositions,
  deleteThreeAnimalDispositions,
  searchByType, searchByBreed, searchByDisposition,
  editOtherAnimalBreed
} = require('../controllers/petsController');

// Specific controller to edit animals
const {
  checkDisposition,
} = require('../controllers/editPetsController');

// Database stuff
const db = require('../database/db-connector');

const petsRouter = express.Router();

// Serve uploaded files statically
petsRouter.use('/uploads', express.static(path.join(__dirname, '../../../animal-uploads')));

// Set up multer for file uploads

const storage = multer.diskStorage({
  destination: 'animal-uploads', 
  // destination: (req, file, cb) => {
  //   cb(null, './animalPicsUploads/'); // specify the upload directory
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // generate a unique filename
  },
});

const upload = multer({ storage: storage });

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
    console.log(results.length);
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

petsRouter.post("/add", upload.single('picture'), (req, res) => {
  // Add a new pet to the app
  // Gets new pet info from frontend form and adds it to database
  let data = req.body;
  let name = data['name'];
  let animal_type = data['animal_type'];
  let picture = req.file.path;
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

  // Update the image with its URL so it can be displayed
  const imageUrl = `https://petpals-connect-service.onrender.com/pets/uploads/${req.file.filename}`; 
  picture = imageUrl;

  // Create the general add query and run it on the db
  let addQuery = addAnimalQuery(name, animal_type, imageUrl, animal_availability, animal_description);

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

petsRouter.put("/edit/:animal_id", upload.single('picture'), (req, res) => {
  // Edit a pet given the pet ID
  // Send the new pet data to frontend
  let data = req.body;
  let id = req.params.animal_id;
  let name = data['name'];
  let animal_type = data['animal_type'];
  let picture = req.file.path;
  let animal_availability = data['animal_availability'];
  let animal_description = data['animal_description'];
  let disposition1 = data['animal_disposition1'];
  let disposition2 = data['animal_disposition2'];
  let disposition3 = data['animal_disposition3'];
  let animal_breed = data['animal_breed'];
  let dispositionsToAdd = [];
  let dispositionsToDelete = [];
  let addValues;
  let deleteValues;
  let dispAddQuery;
  let dispDeleteQuery;

  // store animal dispositions so we can compare (since unchecked dispositions are just sent as "false")
  const dispositions = {
    disp1: "Animal must be leashed at all times",
    disp2: "Good with other animals",
    disp3: "Good with children"
  }

  // Update the image with its URL so it can be displayed
  const imageUrl = `https://petpals-connect-service.onrender.com/pets/uploads/${req.file.filename}`; 
  picture = imageUrl;

  // first do checks with disposition1
  checkDisposition(id, disposition1, dispositions.disp1, dispositionsToAdd, dispositionsToDelete, function(error, result1) {
    if (error) { console.error(error) }
    else {
      dispositionsToAdd = result1.toAdd;
      dispositionsToDelete = result1.toDelete;
      // then do checks with disposition2 to check if we need to add or delete it, etc.
      checkDisposition(id, disposition2, dispositions.disp2, result1.toAdd, result1.toDelete, function(error, result2) {
        if (error) { console.error(error) }
        else {
          // check disposition3
          checkDisposition(id, disposition3, dispositions.disp3, result2.toAdd, result2.toDelete, function(error, result3) {
            if (error) { console.error(error) }
            else {
              dispositionsToAdd = result3.toAdd;
              dispositionsToDelete = result3.toDelete;
              console.log(dispositionsToAdd);
              console.log(dispositionsToDelete);
                // Check for length of dispositionsToAdd to see how many dispositions we need to add
                const dispToAddLength = dispositionsToAdd.length;
                if (dispToAddLength === 1) {
                  addValues = [dispositionsToAdd[0]];
                  dispAddQuery = addAnimalDispositionQuery(id);
                } else if (dispToAddLength === 2) {
                  addValues = [dispositionsToAdd[0], dispositionsToAdd[1]];
                  dispAddQuery = addTwoAnimalDispositionQuery(id);
                } else if (dispToAddLength === 3) {
                  addValues = [dispositionsToAdd[0], dispositionsToAdd[1], dispositionsToAdd[2]];
                  dispAddQuery = addThreeAnimalDispositionQuery(id);
                } 
                
                // TODO: Check for length of dispositionsToDelete to see how many dispositions we need to delete
                const dispToDeleteLength = dispositionsToDelete.length;
                if (dispToDeleteLength === 1) {
                  deleteValues = [dispositionsToDelete[0]];
                  dispDeleteQuery = deleteOneAnimalDisposition(id);
                } else if (dispToDeleteLength === 2) {
                  deleteValues = [dispositionsToDelete[0]], dispositionsToDelete[1];
                  dispDeleteQuery = deleteTwoAnimalDispositions(id);
                } else if (dispToDeleteLength === 3) {
                  deleteValues = [dispositionsToDelete[0], dispositionsToDelete[1], dispositionsToDelete[2]];
                  dispDeleteQuery = deleteThreeAnimalDispositions(id);
                } 

                // add values if there are dispositions to add
                if (addValues && dispAddQuery) {
                  db.pool.query(dispAddQuery, addValues, function(error, result, fields) {
                    if (error) { console.log(error); }
                    else {
                      console.log("Successfully added dispositions: ", dispositionsToAdd);
                    }
                  })
                } 
                // if there are no values to add
                else {
                  console.log("No dispositions to add.");
                }

                if (deleteValues && dispDeleteQuery) {
                  db.pool.query(dispDeleteQuery, deleteValues, function(error, result, fields) {
                    if (error) { console.log(error); }
                    else {
                      console.log("Successfully deleted dispositions: ", dispositionsToDelete);
                    }
                  })
                } 
                // if there are no dispositions to delete
                else {
                  console.log("No dispositions to delete.");
                }
            }
          })
        }
      })
    }
  })

  // Declare general edit query
  let query1 = editAnimalQuery(id, name, animal_type, picture, animal_availability, animal_description);

  // First send the query to update the animal
  db.pool.query(query1, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    }
    else {
      const query2 = checkIfBreedExists(animal_breed);
      db.pool.query(query2, function(error, result, fields) {
        if (error) { console.log(error); res.sendStatus(400); }
        else {
          // if that breed doesn't exist, insert it as "Other"
          if (result.length === 0) {
            animal_breed = "Other";
            let query3 = editOtherAnimalBreed(id, animal_breed, animal_type);
            db.pool.query(query3, function(error, result, fields) {
              if (error) { console.log(error); }
              else {
                res.sendStatus(200);
              }
            })
          } else {
            let query3 = editAnimalBreed(req.params.animal_id, animal_breed);
            // Then update breeds through Animal_Breeds table
            db.pool.query(query3, function(error, result, fields) {
              if (error) { console.log(error); res.sendStatus(400); }
              else {
                console.log(result);
                res.sendStatus(200);
              }
            })
          }
        }
      })
    }
  })
})

petsRouter.delete("/delete/:animal_id", (req, res) => {
  // Delete a pet given the animal ID
  // first retrieve the pet associated with the animal_id
  let getQuery = showOneAnimalQuery(req.params.animal_id);
  let deleteQuery = deleteAnimalQuery(req.params.animal_id)
  db.pool.query(getQuery, function(error, result, fields) {
    if (error) { console.log(error); }
    else {
      // get the associated picture and delete it from the directory
      console.log(result);
      console.log(result[0].imgSrc);
      // imgSrc in the form of: 'http://localhost:3000/pets/uploads/<img_name>.png' 
      const imgSrc = result[0].imgSrc;
      const imgFile = imgSrc.split('/');
      const imgName = imgFile[5];
      // const imgToDelete = (`../../../animal-uploads/${imgName}`);
      const imagePath = path.join(__dirname, "../../../animal-uploads", imgName);
      console.log(imagePath);
      fs.unlink(imagePath, (err) => {
        if (err) { throw err; }
        else { 
          console.log('Image was deleted successfully!'); 
          // then delete the pet associated with the animal_id
          db.pool.query(deleteQuery, function (error, result, fields) {
            if (error) {
              console.log(error);
            } else {
              res.send(result);
            }
          })
        }
      })
    }
  })
})

module.exports = {
  petsRouter: petsRouter
}