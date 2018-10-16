console.log("Hello");

var form = document.querySelector("form");
const API_URL = "http://localhost:5000/keys";

form.addEventListener("submit", function(event) {
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
  })
});