const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const homeRouter = require('../main');

const usersRouter = express.Router();

// db stuff
const db = require('../database/db-connector');

/* USERS ROUTES */
usersRouter.post("/signup", (req, res) => {
  // Receives user info from frontend to pass to database
  let data = req.body;
  let first_name = data['first-name'];
  let last_name = data['last-name'];
  let phone_number = data['phone-number'];
  let email = data['email'];
  let street = data['street'];
  let city = data['city'];
  let state = data['state'];
  let zip_code = data['zip-code'];

  // create query and run it
  let query = `INSERT INTO Prospective_Owners (${first_name}, ${last_name}, ${phone_number}, ${email}, ${street}, ${city}, ${state}, ${zip_code})`;
  db.pool.query(query, function(error, rows, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.redirect(homeRouter);
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
    // res.redirect(homeRouter);
  })
})

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