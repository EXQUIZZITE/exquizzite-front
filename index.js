const express = require("express");
const app = express();
const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "/css/style.css"));
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Triviapp running on port " + process.env.PORT),
);

app.use(express.static(__dirname + "/"));
