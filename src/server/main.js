const express = require('express');
const ViteExpress = require('vite-express');
const axios = require('axios'); 
// const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*', 
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: 'https://petpals-connect.onrender.com',
  clientID: '4IUw5SmUB0lFu7jlSJYtCMMICcB8u3VT',
  issuerBaseURL: 'https://petpals-connect.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

const app = express();

app.use(cors(corsOptions));

// app.use('/uploads', express.static(path.join(__dirname, 'animal-uploads')));

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

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);

module.exports = {
  homeRouter: homeRouter
}
