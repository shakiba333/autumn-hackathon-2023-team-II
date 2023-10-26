const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("morgan");

require("dotenv").config();
require("./backend/config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// app.use(favicon(path.join(__dirname, "build", "AdventurChats_logo_dark.png")));
app.use(express.static(path.join(__dirname, "build")));

// Set up routes and middleware here
app.use("/api/users", require("./backend/routes/user"));
app.use("/api/profiles", require("./backend/routes/profile"));
app.use("/api/meals", require("./backend/routes/meal"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
