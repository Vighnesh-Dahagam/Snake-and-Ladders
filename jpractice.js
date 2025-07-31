const diceImg = document.querySelector("#container img");
const diceSound = new Audio('./Project Images/dice-sound.mp3');
diceImg.addEventListener("click", rollDice);
function rollDice() {
  diceImg.removeEventListener("click", rollDice);
  diceImg.classList.add("rolling");

  diceSound.currentTime = 0; 
  diceSound.play();

  setTimeout(() => {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceImg.src = `./Project Images/dice${roll}.webp`; // Make sure dice1.png to dice6.png exist
    diceImg.classList.remove("rolling");
    diceImg.addEventListener("click", rollDice);
  }, 600);
}