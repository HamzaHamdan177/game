let rockbutton = document.querySelector(".img1-buttonR"),
  paperbutton = document.querySelector(".img1-buttonP");
(scissorsbutton = document.querySelector(".img1-buttonS")),
  (resetbutton = document.querySelector(".button-rest"));
autobutton = document.querySelector(".button-auto");
eventplayer();
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
let AutoF,
  Autohtml,
  Autocheck = false;
updateScoreElement();
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src='image/${playerMove}-emoji.png' width='50px'/>  <img src='image/${computerMove}-emoji.png' width='50px'/>
   Computer`;
}
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function Autoplay() {
  Autohtml = document.querySelector(".button-auto");
  if (!Autocheck) {
    AutoF = setInterval(() => {
      playGame(pickComputerMove());
    }, 1000);
    Autocheck = true;
    Autohtml.innerHTML = "Stop Play";
  } else {
    clearInterval(AutoF);
    Autohtml.innerHTML = "Auto Play";
    Autocheck = false;
  }
}
function eventplayer() {
  window.addEventListener("keydown", (event) => {
    if (event.key == "r" || event.key == "R") playGame("rock");
    else if (event.key == "p" || event.key == "P") playGame("paper");
    else if (event.key == "s" || event.key == "S") playGame("scissors");
  });
  rockbutton.addEventListener("click", () => {
    playGame("rock");
  });

  paperbutton.addEventListener("click", () => {
    playGame("paper");
  });
  scissorsbutton.addEventListener("click", () => {
    playGame("scissors");
  });

  resetbutton.addEventListener("click", () => {
    reset();
  });
  autobutton.addEventListener("click", () => {
    Autoplay();
  });
}
function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

// function Checkauto() {
//   if (document.querySelector(".button-auto").innerHTML === "Stop Play") {
//     clearInterval(AutoF);
//     document.querySelector(".autodiv").innerHTML = buttonpre;
//   }
// }
