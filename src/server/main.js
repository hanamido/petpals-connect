const express = require('express');
const ViteExpress = require('vite-express');
const axios = require('axios'); 
// const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const { petsRouter } = require('./routes/pets.routes.js');
const { usersRouter } = require('./routes/users.routes.js');
const { adminRouter } = require('./routes/admin.routes.js');
const homeRouter = express.Router();

// make sure we can parse the body of requests
app.use(bodyParser.json());

// set up routes for each section
app.use('/pets', petsRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/', homeRouter);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);

module.exports = {
  homeRouter: homeRouter
}
