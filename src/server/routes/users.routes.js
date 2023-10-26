const express = require('express');
const dotenv = require('dotenv').config();

const usersRouter = express.Router();

/* USERS ROUTES */
usersRouter.post("/users/signup", (req, res) => {
  // Receives user info from frontend to pass to database
})

usersRouter.post("/users/login", (req, res) => {
  // Receives user info from database to pass to frontend
})

usersRouter.get("/users/:user_id", (req, res) => {
  // Gets info for one user (admin view?)
})

usersRouter.put("/users/edit/:user_id", (req, res) => {
  // Edit a user given the user ID
  // Send the new user details to frontend
})

// Export the users routes
module.exports = {
  usersRouter: usersRouter
}