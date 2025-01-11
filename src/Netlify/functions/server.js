const express = require("express");
const serverless = require("serverless-http");
const path = require("path");

const app = express();

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Define a route
app.get("/", (req, res) => {
  res.render("index", { message: "Hello from EJS!" });
});

// Export the serverless handler
module.exports.handler = serverless(app);
