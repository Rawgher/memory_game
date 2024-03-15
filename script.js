const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let flipped = 0;
let stopClicks = false;
let score = 0;
const cards = document.querySelectorAll(".card");
let allCards = cards.length;
let bestScore = localStorage.getItem('bestScore');
let start = document.getElementById('game-start');
let startBtn = document.getElementById("start-btn");
let gameOverDiv = document.getElementById('game-over')

if (bestScore) {
  document.getElementById('top-score').innerText = bestScore;
}

for (card of cards) {
  card.addEventListener('click', handleCardClick);
}

startBtn.addEventListener('click', handleGameStart);

function handleGameStart() {
  setScore(0);
  start.classList.add("hide");
  gameContainer.classList.remove('hide');
  let idxs = [];
  for (let i = 1; i <= allCards / 2; i++) {
    idxs.push(i.toString());
  }
  let pairs = shuffle(idxs.concat(idxs));

  for (let i = 0; i < cards.length; i++) {
    let path = "cats/cat" + pairs[i] + '.jpg';
    cards[i].children[1].children[0].src = path;
  }
}

function shuffle(arr) {
  let newArr = arr.slice();
  for (let i1 = newArr.length - 1; i1 > 0; i1--) {
    let i2 = Math.floor(Math.random() * (i1 + 1));
    let hold = newArr[i1];
    newArr[i1] = newArr[i2];
    newArr[i2] = hold;
  }
  return newArr;
}

function setScore(newScore) {
  score = newScore;
  document.getElementById("score").innerText = score;
}

function handleCardClick(event) {
  if (!event.target.classList.contains("card-front")) return;

  let thisCard = event.target.parentElement;

  if (!card1 || !card2) {
    if (!thisCard.classList.contains("cardFlipped")) {
      setScore(score + 1);
    }
    thisCard.classList.add("cardFlipped");
    card1 = card1 || thisCard;
    card2 = thisCard === card1 ? null : thisCard;
  }

  if (card1 && card2) {
    let cat1 = card1.children[1].children[0].src;
    let cat2 = card2.children[1].children[0].src;

    if (cat1 === cat2) {
      flipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
    } else {
      setTimeout(function() {
        card1.classList.remove("cardFlipped");
        card2.classList.remove("cardFlipped");
        card1 = null;
        card2 = null;
      }, 500);
    }
  }

  if (flipped === allCards) gameOver();
}

function gameOver() {
  gameContainer.classList.add('hide');
  gameOverDiv.classList.remove('hide');
  let scoreHolder = document.getElementById("final-score");
  scoreHolder.innerText = "Your score: " + score;
  let bestScore = localStorage.getItem("bestScore") || Infinity;
  if (score < bestScore) {
    scoreHolder.innerText += " -  This is a new high score";
    localStorage.setItem("bestScore", score);
  }
  document.getElementById("game-over").classList.add("game-over");
}