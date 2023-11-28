const express = require('express');
const dotenv = require('dotenv').config();
const { addAdminQuery } = require('../controllers/adminController');
 
const adminRouter = express.Router();

// db stuff
const db = require('../database/db-connector');

/* ADMIN ROUTES */
adminRouter.post("/add", (req, res) => {
  // Gets info from frontend form to pass to database
  // Receives user info from frontend to pass to database
  let data = req.body;
  let firstName = data['first_name'];
  let lastName = data['last_name'];
  let shelterName = data['shelter_name'];

  // create query and run it
  let query = addAdminQuery(firstName, lastName, shelterName);
  db.pool.query(query, function(error, result, fields) {
    if (error) {
      console.log(error);
      res.sendStatus(400);
    } else {
      res.send(result)
    }
  })
})

adminRouter.get("/:admin_id", (req, res) => {
  // Gets info from database about admin to pass to frontend
  // Declare query1
  let showAdminQuery;

  // Perform SELECT based on admin_id
  showAdminQuery = `SELECT * from Admins where admin_id = ${req.params.admin_id}`;
  // Run the query
  db.pool.query(showAdminQuery, function (err, results, fields) {
    // get all the admins in the database to pass to frontend
    if (err) throw err;  // error handling
    // send results to frontend
    res.send(results);
  })
})

/* Stretch Features */
adminRouter.put("/edit/:admin_id", (req, res) => {
  // Edit an admin given the admin ID
})

adminRouter.delete("/delete/admin_id", (req, res) => {
  // Delete an admin user given the admin ID
})

module.exports = {
    adminRouter: adminRouter
}