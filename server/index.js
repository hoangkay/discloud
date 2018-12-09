const express = require("express");
const cors = require("cors");
const monk = require("monk");
const fetch = require("node-fetch");
const btoa = require("btoa");
require("dotenv").config();

const app = express();
const db = monk("localhost:27017/discloud");
const jobs = db.get("jobs");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent("http://localhost:5000/callback");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "Hello!"
  });
});

app.get("/login", (request, response) => {
  response.json({
    message: "https://discordapp.com/oauth2/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + redirect + "&response_type=code&scope=messages.read%20identify%20guilds"
  });
});

app.get("/callback", (request, response) => {
  if (!request.query.code) throw new Error("NoCodeProvided");
  const code = request.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  
  fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}&scope=identify%20guilds%20messages.read`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Basic ${creds}`,
    },
  }).then(ATResponse => ATResponse.json())
    .then(body => {
      // Insert into db
      console.log(body);
    });

    response.redirect('http://127.0.0.1:8080');
});

function isValidKey(key) {
  return key.id.toString() !== "" && /^\d+$/.test(key.id.toString());
}

app.post("/keys", (request, response) => {
  if (isValidKey(request.body)) {
    // Insert into db
    var job = {
      id: request.body.id.toString(),
      created: new Date()
    };
    jobs
      .insert(job)
      .then((createdJob) => {
        response.json(createdJob);
      });
  } else {
    response.status(422);
    response.json({
      message: "Invalid key"
    });
  }
});

app.listen(5000, () => {
  console.log("Listening on http://localhost:5000");
});