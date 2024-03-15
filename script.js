const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flipped = 0;
let stopClicks = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  // console.log("you just clicked", event.target);
  if (stopClicks) return;
  if (event.target.classList.contains("flippedCards")) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add("flippedCards");
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    stopClicks = true;
    let classA = card1.className;
    let classB = card2.className;

    if (classA === classB) {
      flipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      stopClicks = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flippedCards");
        card2.classList.remove("flippedCards");
        card1 = null;
        card2 = null;
        stopClicks = false;
      }, 500);
    }
  }

  if (flipped === COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);