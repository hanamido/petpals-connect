const express = require('express');
const dotenv = require('dotenv').config();

const adminRouter = express.Router();

/* ADMIN ROUTES */
adminRouter.post("/signup", (req, res) => {
  // Gets info from frontend form to pass to database
})

adminRouter.get("/:admin_id", (req, res) => {
  // Gets details about one admin
  // Declare query1
  let showUserQuery;

  // Perform SELECT based on admin_id
  showUserQuery = `SELECT * from Admins where admin_id = ${req.params.admin_id}`;
  // Run the query
  // db.pool.query(showAdminQuery, function (err, results, fields) {
  //   // get all the admins in the database to pass to frontend
  //   if (err) throw err;  // error handling
  //   // send results to frontend
  //   res.send(results);
  // })
})

adminRouter.put("/edit/:admin_id", (req, res) => {
  // Edit an admin given the admin ID
})

module.exports = {
    adminRouter: adminRouter
}