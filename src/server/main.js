const express = require('express')
const ViteExpress = require('vite-express')

const app = express();

/* PETS ROUTES */
app.get("/pets", (err, req, res) => {
  // Display all pets in the app 
});

app.get("/pets/:pet_id", (err, req, res) => {
  // Display details for one pet when clicked on
})

app.post("/pets/add", (err, req, res) => {
  // Add a new pet to the app
  // Gets new pet info from form and adds it to database
  // Then pass new data to frontend
})

app.put("/pets/edit/:pet_id", (err, req, res) => {
  // Edit a pet given the pet ID
  // Send the new pet data to frontend
})


/* USERS ROUTES */
app.post("/users/signup", (err, req, res) => {
  // Receives user info from frontend to pass to database
})

app.post("/users/login", (err, req, res) => {
  // Receives user info from database to pass to frontend
})

app.get("/users/:user_id", (err, req, res) => {
  // Gets info for one user (admin view?)
})

app.put("/users/edit/:user_id", (err, req, res) => {
  // Edit a user given the user ID
  // Send the new user details to frontend
})


/* ADMIN ROUTES */
app.post("/admins/signup", (err, req, res) => {
  // Gets info from frontend to pass to database
})

app.post("/admins/login", (err, req, res) => {
  // Gets info from database to pass to frontend
})

app.get("/admins/:admin_id", (err, req, res) => {
  // Gets details about one admin
})

app.put("/admins/edit/:admin_id", (err, req, res) => {
  // Edit an admin given the admin ID
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
