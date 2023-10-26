const express = require('express');
const ViteExpress = require('vite-express');
const axios = require('axios'); 
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

const { petsRouter } = require('./routes/pets.routes');
const { usersRouter } = require('./routes/users.routes');
const { adminRouter } = require('./routes/admin.routes');

// make sure we can parse the body of requests
app.use(bodyParser.json());

// set up routes
app.use('/pets', petsRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
