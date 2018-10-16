const express = require("express");
const cors = require("cors");
const monk = require("monk");

const app = express();

const db = monk("localhost:27017/discloud");
const jobs = db.get("jobs");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.json({
    message: "Hello!"
  });
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