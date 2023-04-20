const GRID_ROWS = 10;
const GRID_COLS = 10;
const PLANE_PARTS = 3;
const TIME_LIMIT = 60;

let timeLeft, timer;

function createGrid() {
    const grid = document.querySelector(".grid");

    // Clear any existing cells
    grid.innerHTML = "";

    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            grid.appendChild(cell);
        }
    }
}

function placePlaneParts() {
    const cells = document.querySelectorAll(".cell");

    // Clear any existing plane parts
    cells.forEach((cell) => cell.classList.remove("plane-part"));

    // Select random cells to be plane parts
    const planePartIndices = [];
    while (planePartIndices.length < PLANE_PARTS) {
        const index = Math.floor(Math.random() * GRID_ROWS * GRID_COLS);
        if (!planePartIndices.includes(index)) {
            planePartIndices.push(index);
        }
    }

    // Add plane parts to selected cells
    planePartIndices.forEach((index) => {
        cells[index].classList.add("plane-part");
    });
}

function startGame() {
    // show the grid
    const grid = document.querySelector(".grid");
    grid.style.display = "grid";

    // change the button text and functionality
    const button = document.querySelector(".start-button");
    button.innerText = "Stop Game";
    button.style.backgroundColor = "red"; // change button color to red
    button.removeEventListener("click", startGame);
    button.addEventListener("click", stopGame);

    // place plane parts
    placePlaneParts();

    // start the timer
    timeLeft = TIME_LIMIT;
    timer = setInterval(countdown, 1000);
}

function stopGame() {
    // hide the grid
    const grid = document.querySelector(".grid");
    grid.style.display = "none";

    // change the button text and functionality
    const button = document.querySelector(".start-button");
    button.innerText = "Start Game";
    button.style.backgroundColor = "#4CAF50"; // change button color back to green
    button.removeEventListener("click", stopGame);
    button.addEventListener("click", startGame);

    // stop the timer
    clearInterval(timer);
}

function countdown() {
    const timerElement = document.querySelector(".timer");
    timeLeft--;
    timerElement.innerText = `Time Left: ${timeLeft}`;

    if (timeLeft === 0) {
        stopGame();
        alert("Time's up! Game over.");
    }
}

// create grid on page load
window.addEventListener("load", createGrid);

// attach event listener to start button
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startGame);
