const API = "https://destination-backend-ethan.herokuapp.com/";

fetch(API)
  .then((res) => res.json())
  .then((data) => displayDest(data));

function displayDest(data) {
  let desDiv = "";
  for (ele of data) {
    desDiv += createCard(ele);
  }
  document.querySelector(".destination_container").innerHTML = desDiv;
}

function createCard(ele) {
  let singleCard = `
        <div class="card" style="width: 15rem; margin: 20px;">
            <img class="card-img-top" src=${ele.photo}>
            <div class="card-body">
                <h5 class="card-title">${ele.name}</h5>
                <h6 class="card-subtitle" style="color: gray;">${ele.location}</h6>
                <p class="card-text">${ele.description}</p>
                <div class="button_container">
                    <button class="btn btn-warning">Edit</button>
                    <button class="btn btn-danger">Remove</button>
                </div>
            </div>
        </div>`;

  return singleCard;
}

document
  .getElementById("userForm")
  .addEventListener("submit", createDestination);

function createDestination(event) {
  event.preventDefault();

  const userData = {
    name: event.target["destination_name"].value,
    location: event.target["destination_location"].value,
    description: event.target["description"].value,
  };

  fetch(API, {
    method: "POST",
    body: new URLSearchParams(userData),
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".destination_container").innerHTML += createCard(
        data
      );
    });
}
