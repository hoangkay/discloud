const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", function(request, response) {
  response.json({
    message: "Hello!"
  });
});

function isValidKey(key) {
  return /^\d+$/.test(key.id);
}

app.post("/keys", function(request, response) {
  if (isValidKey(request.body)) {
    // Insert into db
  } else {
    response.status(422);
    response.json({
      message: "Invalid key"
    });
  }
});

app.listen(5000, function() {
  console.log("Listening on http://localhost:5000");
});