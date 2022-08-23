// console.log("api")
const express = require("express");
const app = express();

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");

// for Home
const path = require("path");

// API Version
const ApiVersion = "/v1";
const ApiFortnite = "/v1/fortnite";
const ApiFortniteStwHeroes = "/v1/fortnite/save-the-world/heroes";

// Home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// GET /v1/
app.get(`${ApiVersion}`, (req, res) => {
  res.json({
    data: [
      {
        title: "API",
        author: {
          firstName: "fabrice",
          lastName: "geib",
        },
        games: [
          { title: "Fortnite", genre: "Survival", releaseDate: "2017" },
          {
            title: "Grand Theft Auto V",
            genre: "Action-adventure",
            releaseDate: "2014",
          },
        ],
      },
    ],
  });
});

// GET /v1/fortnite
app.get(`${ApiFortnite}`, (req, res) => {
  res.json({
    data: [
      {
        title: "Fortnite",
        author: {
          firstName: "",
          lastName: "",
        },
        developer: "EPIC Games",
        games: [{ title: "Fortnite", genre: "Survival", releaseDate: "2017" }],
      },
    ],
  });
});

// GET /v1/fortnite/save-the-world/heroes - Fortnite STW Heroes
const dataPath = "./data/fortnite/save-the-world/heroes.json";

app.get(`${ApiFortniteStwHeroes}`, (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      throw err;
    }

    res.send(JSON.parse(data));
  });
});

// GET /v1/fortnite/ - Fortnite STW Heroes
const heroesJson = "./data/fortnite/save-the-world/heroes.json";

app.get(`${ApiFortniteStwHeroes}/:id`, (req, res) => {
  const id = req.params.id - 1;

  res.json({
    data: heroesJson[id] || null,
  });
});

//The 404 Route (ALWAYS Keep this as the last route)
// app.get('*', function(req, res){
//   res.send('404', 404);
// });

// expressjs 404 - Sorry cant find that!
app.use(function (req, res, next) {
  res.status(404).send("404");
});

app.listen(3000, () => console.log("Listening on port 3000"));
