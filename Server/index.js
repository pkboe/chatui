const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 2000;

// Where we will keep greets
let greets = ["Hello", "Hi", "Hola", "Namaste", "Welcome!", "Are Boi!"];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Boi");
});

app.get("/greet", (req, res) => {
  let output = greets[Math.floor(Math.random() * greets.length)];
  res.send(output);
});

app.listen(process.env.PORT || 2000, () => console.log("Server is running..."));
