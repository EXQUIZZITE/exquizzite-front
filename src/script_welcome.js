let player = {
  username: "guest",
  avatar: "/images/avatar.png",
};

let button = document.querySelector("#add");
let input = document.getElementById("username");
let avatar = document.querySelectorAll(".avatarselected");
let container = document.querySelector(".container");
let username = document.getElementById("username_user");

avatar.forEach((element) => {
  element.addEventListener("click", (e) => {
    localStorage.clear()
    player.avatar = `/images/${e.target.id}.png`;
    localStorage.setItem("avatar", `/images/${e.target.id}.png`);
  });
});

button.addEventListener("click", (e) => {
  player.username = input.value;
  localStorage.setItem("username", `${player.username}`);
  container.innerHTML = "";
  let user = document.createElement("div");
  user.setAttribute("class", "card d-flex flex-column justify-content-center");
  user.innerHTML = `
    <h1 id="username_user" class="col mb-5">Hi, ${player.username}</h1>
    <img  id="avatar-card" src="${player.avatar}" class="card-img-top col" alt="...">
    <button id="start" onclick="document.location.href='questions.html'" type="button" class="btn btn-primary mt-5">Start Game</button>
    `;
  container.appendChild(user);
});

// export { player } from "/src/script_welcome.js"
// export { player as default } from "/src/script_welcome.js"
