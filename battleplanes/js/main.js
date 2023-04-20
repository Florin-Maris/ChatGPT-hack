const GRID_ROWS = 10;
const GRID_COLS = 10;
const PLANE_PARTS = 3;

function createGrid() {
    const grid = document.querySelector(".grid");

    // Clear any existing cells
    grid.innerHTML = "";

    // Set the number of rows and columns
    grid.style.setProperty("--num-rows", GRID_ROWS);
    grid.style.setProperty("--num-cols", GRID_COLS);

    // Add cells to the grid
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
    cells.forEach((cell) => {
        cell.classList.remove("plane-part");
        cell.classList.remove("black");
    });

    // Select random cell to turn black
    const blackIndex = Math.floor(Math.random() * GRID_ROWS * GRID_COLS);

    // Add black class to selected cell
    cells[blackIndex].classList.add("black");
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
}

// create grid on page load
window.addEventListener("load", createGrid);

// attach event listener to start button
const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", startGame);
