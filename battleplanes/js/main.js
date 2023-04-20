// Define constants
const GRID_SIZE = 10;
const PLANE_PARTS = [
    { type: 'wing', cells: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }] },
    { type: 'wing', cells: [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }] },
    { type: 'body', cells: [{ x: 5, y: 1 }] },
    { type: 'tail', cells: [{ x: 8, y: 1 }, { x: 9, y: 1 }, { x: 9, y: 2 }] },
];

// Define variables
let planeCells = [];
let timeLeft = 300;

// Define functions
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function createGrid() {
    const grid = document.querySelector('.grid');
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.setAttribute('data-id', i);
        grid.appendChild(cell);
    }
}

createGrid();
document.querySelector('.start-button').addEventListener('click', startGame);
