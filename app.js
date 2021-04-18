const rows = 10;
const cols = 10;
const numberOfBomb = 10;
const grid = document.getElementById("main");
const randomBomb = [];
const flag = document.getElementById("flagsLeft");
let flagLeft = 10;
flag.innerHTML = flagLeft;
const message = document.getElementById("result");
const flagArray = [];
let points = 0;
// bomb in neighbourhood
function setDataAtrribute(id) {
  let bombInNeighbourhood = 0;
  // top
  if (randomBomb.includes(id - 10)) {
    bombInNeighbourhood += 1;
  }
  // bottom
  if (randomBomb.includes(id + 10)) {
    bombInNeighbourhood += 1;
  }
  // left
  if (
    Math.floor((id - 1) / 10) == Math.floor(id / 10) &&
    randomBomb.includes(id - 1)
  ) {
    bombInNeighbourhood += 1;
  }
  // right
  if (
    Math.floor((id + 1) / 10) == Math.floor(id / 10) &&
    randomBomb.includes(id + 1)
  ) {
    bombInNeighbourhood += 1;
  }
  // north-east (id-10+1)
  if (
    Math.floor((id - 9) / 10) < Math.floor(id / 10) &&
    randomBomb.includes(id - 9)
  ) {
    bombInNeighbourhood += 1;
  }
  // north-west (id-10-1)
  if (
    id - 11 >= 0 &&
    Math.floor(id / 10) - Math.floor((id - 11) / 10) === 1 &&
    randomBomb.includes(id - 11)
  ) {
    bombInNeighbourhood += 1;
  }
  // south-east (id+10+1)
  if (
    id + 11 <= 99 &&
    Math.floor((id + 11) / 10) - Math.floor(id / 10) === 1 &&
    randomBomb.includes(id + 11)
  ) {
    bombInNeighbourhood += 1;
  }
  // south-west (id+10-1)
  if (
    Math.floor(id / 10) < Math.floor((id + 9) / 10) &&
    randomBomb.includes(id + 9)
  ) {
    bombInNeighbourhood += 1;
  }
  return bombInNeighbourhood;
}
// final result
function result(msg) {
  for (let i = 0; i < rows * cols; i++) {
    let cell = document.getElementById(i);
    cell.removeEventListener("click", handleLeftClick);
    cell.removeEventListener("contextmenu", handleRightClick);
    cell.classList.add("checked");
    if (randomBomb.includes(i)) {
      cell.style.backgroundImage =
        "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
      cell.style.backgroundSize = "cover";
      cell.style.backgroundColor = "red";
    }
  }
  message.innerHTML = msg;
}
// handle left-click
function handleLeftClick(event) {
  let cell = event.target;
  let id = parseInt(cell.id);
  if (cell.classList.contains("flag")) {
    cell.classList.remove("flag");
    cell.style.backgroundImage = "";
    cell.style.backgroundColor = "";
    flagLeft += 1;
    flag.innerHTML = flagLeft;
    let index = flagArray.indexOf(id);
    flagArray.splice(index, 1);
  }
  // if bomb clicked
  if (randomBomb.includes(id)) {
    result("YOU LOSE!");
  } else {
    points += 1;
    cell.style.backgroundColor = "green";
    cell.innerHTML = cell.getAttribute("data");
    cell.classList.add("checked");
    cell.removeEventListener("click", handleLeftClick);
    cell.removeEventListener("click", handleRightClick);
  }
  if (points === 90) {
    result("YOU WIN!");
  }
}
// is-equal array
function isEqual(a, b) {
  a.sort((c, d) => c - d);
  b.sort((c, d) => c - d);
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }
  return true;
}
// handle right-click
function handleRightClick(event) {
  event.preventDefault();
  let cell = event.target;
  let id = Number(cell.id);
  if (cell.classList.contains("flag")) {
    cell.classList.remove("flag");
    cell.style.backgroundImage = "";
    cell.style.backgroundColor = "";
    flagLeft += 1;
    flag.innerHTML = flagLeft;
    let index = flagArray.indexOf(id);
    flagArray.splice(index, 1);
  } else {
    if (flagLeft > 0) {
      cell.classList.add("flag");
      cell.style.backgroundImage =
        "url(https://img.icons8.com/color/48/000000/filled-flag.png)";
      cell.style.backgroundSize = "cover";
      cell.style.backgroundColor = "#ef937e";
      flagLeft -= 1;
      flag.innerHTML = flagLeft;
      flagArray.push(id);
    }
  }
  if (flagLeft == 0 && isEqual(flagArray, randomBomb)) {
    result("YOU WIN!");
  }
}
// generating random-bomb
for (let i = 0; i < numberOfBomb; i++) {
  let temp = Math.floor(Math.random() * 100);
  while (randomBomb.includes(temp)) {
    temp = Math.floor(Math.random() * 100);
  }
  randomBomb.push(temp);
}
// creating grid-cell
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let cell = document.createElement("div");
    let id = 10 * i + j;
    cell.setAttribute("id", id);
    cell.setAttribute("class", "grid-cell");
    if (randomBomb.includes(id)) {
      cell.classList.add("bomb");
    } else {
      cell.classList.add("valid");
    }
    let b = setDataAtrribute(id);
    cell.setAttribute("data", b);
    cell.addEventListener("click", handleLeftClick);
    cell.addEventListener("contextmenu", handleRightClick);
    grid.appendChild(cell);
  }
}
