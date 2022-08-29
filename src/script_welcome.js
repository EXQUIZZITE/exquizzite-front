let player = {
  username: "guest",
  avatar: "/images/avatar.png",
};

let button = document.querySelector("#add");
let input = document.getElementById("username");
let avatar = document.querySelectorAll(".card-img-top");
let container = document.querySelector(".container");
let username = document.getElementById("username_user");

avatar.forEach((element) => {
  element.addEventListener("click", (e) => {
    localStorage.clear();
    player.avatar = `/images/${e.target.id}.png`;
    localStorage.setItem("avatar", `/images/${e.target.id}.png`);
  });
});

button.addEventListener("click", (e) => {
  player.username = input.value;
  localStorage.setItem("username", `${player.username}`);
  console.log(player);
  container.innerHTML = "";
  let user = document.createElement("div");
  user.setAttribute("class", "card d-flex flex-column justify-content-center");
  user.innerHTML = `
    <h1 id="username_user" class="col">Hi, ${player.username}</h1>
    <img  id="avatar-card" src="${player.avatar}" class="card-img-top col" alt="...">
    <button id="start" onclick="document.location.href='questions.html'" type="button" class="btn btn-primary">Start Game</button>
    `;
  container.appendChild(user);
  console.log(player);
});

// export { player } from "/src/script_welcome.js"
// export { player as default } from "/src/script_welcome.js"
