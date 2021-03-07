const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require('./routes/index').router;

const app = express();

const baseURI = '/api/';

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "benvenue a l'application umdeny" });
});

/*const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
 // console.log("Drop and re-sync db.");
});*/

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.set('port', PORT);
app.use(baseURI, apiRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});