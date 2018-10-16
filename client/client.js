const API_URL = "http://localhost:5000/keys";
const LOGIN_URL = "http://localhost:5000/login";

var loginButton = document.querySelector("#login");
var form = document.querySelector("form");

console.log(loginButton);

loginButton.addEventListener("click", () => {
  fetch(LOGIN_URL)
    .then(response => response.json())
    .then(message => {
      console.log(message);
      window.location.replace(message.message);
    });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  var formData = new FormData(form);
  var id = formData.get("channelID");
  var token = formData.get("clientToken");  

  var key = {
    id,
    token
  };
  
  fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(key)
  }).then(response => response.json())
    .then(createdJob => {
      console.log(createdJob);
    });
});