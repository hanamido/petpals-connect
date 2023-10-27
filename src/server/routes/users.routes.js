const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const usersRouter = express.Router();

/* USERS ROUTES */
usersRouter.post("/signup", (req, res) => {
  // Receives user info from frontend to pass to database
})

usersRouter.get("/:user_id", (req, res) => {
  // Gets info for one user from the database once they are logged in
  // Declare query1
  let showUserQuery;

  // Perform SELECT based on user_id
  showUserQuery = `SELECT * from Users where user_id = ${req.params.user_id}`;
  // Run the query
  // db.pool.query(showUserQuery, function (err, results, fields) {
  //   // get all the users in the database to pass to frontend
  //   if (err) throw err;  // error handling
  //   // send results to frontend
  //   res.send(results);
  // })
})

usersRouter.put("/edit/:user_id", (req, res) => {
  // Edit a user given the user ID
  // Send the new user details to frontend
})

// Export the users routes
module.exports = {
  usersRouter: usersRouter
}