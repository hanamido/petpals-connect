const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { addUserQuery } = require('../controllers/usersController');

const usersRouter = express.Router();

// db stuff
const db = require('../database/db-connector');

/* USERS ROUTES */
usersRouter.post("/add", (req, res) => {
  // Receives user info from frontend to pass to database
  let data = req.body;
  let firstName = data['first_name'];
  let lastName = data['last_name'];
  let phoneNumber = data['phone_number'];
  let email = data['email'];
  let street = data['street'];
  let city = data['city'];
  let state = data['state'];
  let zipCode = data['zip_code'];

  // create query and run it
  let query = addUserQuery(firstName, lastName, phoneNumber, email, street, city, state, zipCode);
  db.pool.query(query, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.send(result);
    }
  })
})

usersRouter.get("/:owner_id", (req, res) => {
  // Gets info for one user from the database once they are logged in
  // Declare query1
  let showUserQuery;

  // Perform SELECT based on user_id
  showUserQuery = `SELECT * from Prospective_Owners where owner_id = ${req.params.owner_id}`;
  // Run the query
  db.pool.query(showUserQuery, function (err, results, fields) {
    // get one user in the database to pass to frontend
    if (err) throw err;  // error handling
    // send results to frontend
    res.send(results);
  })
})

/* Stretch Features */
usersRouter.put("/edit/:user_id", (req, res) => {
  // Edit a user given the user ID
  // Send the new user details to frontend
})

usersRouter.delete("/delete/:user_id", (req, res) => {
  // Delete a user given the user ID
  // possible redirect to home page after success
})

// Export the users routes
module.exports = {
  usersRouter: usersRouter
}