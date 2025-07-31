const game_cells = Array.from(document.getElementsByClassName("game-cells"));
let player1 = 0, player2 = 0;
let player1_cell = null, player2_cell = null;
let currentPlayer = 1; // 1 for P1, 2 for P2

// Color cells: even and odd
game_cells.forEach(cell => {
  const number = parseInt(cell.textContent);
  if (!isNaN(number)) {
    cell.style.backgroundColor = number % 2 === 0 ? "#363697" : "#864f7d";
  }
});

// Add snakes and ladders
addSnakesAndLadders(game_cells);
function addSnakesAndLadders(game_cells) {
  const snakes = [[99, 40], [92, 70], [87, 22], [65, 3], [47, 4], [34, 7]];
  const ladders = [[58, 82], [31, 73], [19, 43], [11, 66], [5, 46]];
  let snakesTracker = 0;
  let laddersTracker = 0;

  for (let i = 0; i < game_cells.length; i++) {
    const cell = game_cells[i];
    const cellNum = parseInt(cell.textContent);

    if (snakesTracker < snakes.length && cellNum === snakes[snakesTracker][0]) {
      cell.style.backgroundColor = "#831f1f";
      cell.textContent = `${snakes[snakesTracker][0]} -> ${snakes[snakesTracker][1]}`;
      snakesTracker++;
    } else if (laddersTracker < ladders.length && cellNum === ladders[laddersTracker][0]) {
      cell.style.backgroundColor = "#3f953f";
      cell.textContent = `${ladders[laddersTracker][0]} -> ${ladders[laddersTracker][1]}`;
      laddersTracker++;
    }
  }
}

// Start the game
const diceImg = document.querySelector("#dice img");
const diceSound = new Audio('./Project Images/dice-sound.mp3');
diceImg.addEventListener("click", handleDiceRoll);

function handleDiceRoll() {
  diceImg.removeEventListener("click",handleDiceRoll);
  const result = document.getElementById("result");
  diceImg.classList.add("rolling");
  diceSound.currentTime = 0; 
  diceSound.play();
  setTimeout(()=>{
    const roll = Math.floor(Math.random() * 6) + 1;
    result.style.fontSize = "1.5rem";
    diceImg.src = `./Project Images/dice${roll}.webp`; // Make sure dice1.png to dice6.png exist
    result.textContent = currentPlayer === 1 ? `Teddy : ${roll}` : `Duck : ${roll}`;
    // Color animation
    result.style.color = result.style.color === "black" || result.style.color === "pink" ? "yellow" : "pink";
    diceImg.classList.remove("rolling");
    gameLogic(game_cells, roll, currentPlayer);
    diceImg.addEventListener("click", handleDiceRoll);
  }, 600);

}



// Game logic for each player
function gameLogic(game_cells, rollValue, playerNum) {
  const snakes = { 99: 40, 92: 70, 87: 22, 65: 3, 47: 4, 34: 7 };
  const ladders = { 58: 82, 31: 73, 19: 43, 11: 66, 5: 46 };

  if (playerNum === 1) {
    if (player1_cell && player1_cell.querySelector(".p1")) {
      player1_cell.removeChild(player1_cell.querySelector(".p1"));
    }

    player1 += rollValue;
    if (player1 > 100) player1 -= rollValue;
    else if (snakes[player1]) player1 = snakes[player1];
    else if (ladders[player1]) player1 = ladders[player1];

    game_cells.forEach(cell => {
      const text = cell.textContent.split("->")[0].trim();
      if (parseInt(text) === player1) {
        player1_cell = cell;

        const token = document.createElement("img");
        token.src = "./Project Images/teddy.jpg";
        token.alt = "P1";
        token.classList.add("p1");
        token.width = 30;
        token.height = 30;
        token.style.borderRadius = "50%";

        player1_cell.appendChild(token);
      }
    });

    if (player1 === 100) {
      setTimeout(() => {
      alert("🎉 Teddy wins!");
      location.reload();
    }, 100);
    }

    currentPlayer = 2;
  } else {
    if (player2_cell && player2_cell.querySelector(".p2")) {
      player2_cell.removeChild(player2_cell.querySelector(".p2"));
    }

    player2 += rollValue;
    if (player2 > 100) player2 -= rollValue;
    else if (snakes[player2]) player2 = snakes[player2];
    else if (ladders[player2]) player2 = ladders[player2];

    game_cells.forEach(cell => {
      const text = cell.textContent.split("->")[0].trim();
      if (parseInt(text) === player2) {
        player2_cell = cell;

        const token = document.createElement("img");
        token.src = "./Project Images/duck.webp";
        token.alt = "P2";
        token.classList.add("p2");
        token.width = 30;
        token.height = 30;
        token.style.borderRadius = "50%";

        player2_cell.appendChild(token);
      }
    });

    if (player2 === 100) {
      setTimeout(() => {
      alert("🎉 Duck wins!");
      location.reload();
    }, 100);

    }

    currentPlayer = 1;
  }

}
