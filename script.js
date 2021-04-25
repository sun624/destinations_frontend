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
        <div class="card" id=${ele.uid} style="width: 15rem; margin: 20px;">
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
    name: document.getElementById("destination_name").value,
    location: document.getElementById("destination_location").value,
    description: document.getElementById("description").value,
  };

  renderPage(userData,"POST");
  resetForm();
}

document
  .querySelector(".destination_container")
  .addEventListener("click", handleButtons);

function handleButtons(event) {

  const uid = event.target.parentNode.parentNode.parentNode.id;

  if (event.target.innerText === "Edit"){

    const userData = {
      uid: uid,
      name: prompt("What is you new place?"),
      location: prompt("where is the next Stop?"),
      description: prompt("Your new description for the next trip"),
    };
    renderPage(userData,"PUT");
  }
  if (event.target.innerText === "Remove") renderPage({uid},"DELETE");
}

function renderPage(info,method){
  fetch(API, {
    method: method,
    //MUST match the data type body is sending
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      displayDest(data);
      console.log(data);
    });
}

function resetForm(){
  document.getElementById("destination_name").value='';
  document.getElementById("destination_location").value = "";
  document.getElementById("description").value = "";
}
