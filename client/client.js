console.log("Hello");

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  console.log("form was submitted");
});