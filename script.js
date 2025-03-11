// script.js
const rollButtons = document.querySelectorAll('.roll-button');
const diceFace = document.querySelector('.dice-face');
let currentPlayer = 1; 
let timerInterval; 

function startTimer(playerIndex) {
  const timerElement = document.querySelector(`.player-${playerIndex} .timer`);
  let secondsRemaining = 10;

  timerElement.textContent = secondsRemaining;

  timerInterval = setInterval(() => {
    secondsRemaining--;
    timerElement.textContent = secondsRemaining;

    if (secondsRemaining === 0) {
      clearInterval(timerInterval);
      skipTurn();
    }
  }, 1000); 
}

function skipTurn() {
  currentPlayer = (currentPlayer % 4) + 1; 
  updatePlayerTurn();
}

function updatePlayerTurn() {
  const previousPlayer = document.querySelector(`.player-${currentPlayer}`);
  previousPlayer.classList.remove("active");

  const currentPlayerElement = document.querySelector(`.player-${currentPlayer}`);
  currentPlayerElement.classList.add("active");
  startTimer(currentPlayer); // Start timer for the new player
}

function movePiece(pieceElement, newX, newY) {
  pieceElement.style.transform = `translate(${newX}px, ${newY}px)`; 
  pieceElement.classList.add("moving");

  setTimeout(() => {
    pieceElement.classList.remove("moving"); 
  }, 500); 
}

rollButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Simulate dice roll (generate random number 1-6)
    const rollResult = Math.floor(Math.random() * 6) + 1;

    // Update the dice face (you can display dots, numbers, or images)
    diceFace.style.transform = `rotate(${rollResult * 60}deg)`; 

    // Example: Display the roll result on the button
    button.textContent = `Roll for Player ${button.parentElement.classList[1].replace('player-', '')}: ${rollResult}`;

    // Handle piece movement based on the roll result (example)
    const pieceToMove = document.querySelector(`.piece-${currentPlayer}`);
    const newPosition = calculateNewPosition(pieceToMove, rollResult); // Your logic to calculate the new position
    movePiece(pieceToMove, newPosition.x, newPosition.y);

    // After the roll, switch to the next player
    skipTurn(); 
  });
});

// Start the game
updatePlayerTurn(); 
