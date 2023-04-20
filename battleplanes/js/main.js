// Define constants
const GRID_SIZE = 10;
const PLANE_PARTS = [
    {
        type: "wing",
        cells: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
        ],
    },
    {
        type: "wing",
        cells: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 3, y: 1 },
            { x: 4, y: 1 },
        ],
    },
    { type: "body", cells: [{ x: 5, y: 1 }] },
    {
        type: "tail",
        cells: [
            { x: 8, y: 1 },
            { x: 9, y: 1 },
            { x: 9, y: 2 },
        ],
    },
];

// Define variables
let planeCells = [];
const TIME_LIMIT = 300;
let timeLeft = TIME_LIMIT;
let timer;

// Define functions
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createGrid() {
    const grid = document.querySelector(".grid");
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement("div");
        cell.setAttribute("data-id", i);
        grid.appendChild(cell);
    }
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

document.querySelector(".start-button").addEventListener("click", startGame);
createGrid();
