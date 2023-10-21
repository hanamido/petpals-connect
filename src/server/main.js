const express = require('express')
const ViteExpress = require('vite-express')

const app = express();

app.get("/pets", (req, res) => {
  /* Display all pets in the database. 
   */
  res.send("All pets in the database");
});

app.get("/")

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
