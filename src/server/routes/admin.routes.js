const express = require('express');
const dotenv = require('dotenv').config();

const adminRouter = express.Router();

/* ADMIN ROUTES */
adminRouter.post("/admins/signup", (req, res) => {
  // Gets info from frontend form to pass to database
})

adminRouter.post("/admins/login", (req, res) => {
  // Gets info from database to pass to UI
})

adminRouter.get("/admins/:admin_id", (req, res) => {
  // Gets details about one admin
})

adminRouter.put("/admins/edit/:admin_id", (req, res) => {
  // Edit an admin given the admin ID
})

module.exports = {
    adminRouter: adminRouter
}