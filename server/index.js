const express = require("express");
const cors = require("cors");
const monk = require("monk");

const app = express();

const db = monk("localhost:27017/discloud");
const jobs = db.get("jobs");

// const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_ID = "501861885809917953";
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirect = encodeURIComponent("http://localhost:5000");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "Hello!"
  });
});

app.get("/login", (request, response) => {
  // response.header("Access-Control-Allow-Origin", "*");
  // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // var url = "https://discordapp.com/oauth2/authorize?client_id=$" + CLIENT_ID + "&scope=identify&response_type=code&redirect_uri=$" + redirect;
  // console.log(url);
  response.json({
    message: "https://discordapp.com/oauth2/authorize?client_id=" + CLIENT_ID + "&redirect_uri=" + redirect + "&response_type=code&scope=messages.read%20identify%20guilds"
  });
  // response.redirect("https://discordapp.com/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify&response_type=code&redirect_uri=${redirect}");
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