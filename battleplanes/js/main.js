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
    grid.style.gridGap = '4px';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    grid.style.gridTemplateRows = 'repeat(10, 1fr)';
    grid.style.width = '500px';
}

function generatePlane() {
    let plane = PLANE_PARTS.map(part => {
        const newPart = { type: part.type, cells: [] };
        part.cells.forEach(cell => {
            newPart.cells.push({ x: getRandomInt(GRID_SIZE), y: getRandomInt(GRID_SIZE) });
        });
        return newPart;
    });

    // Check if any cells overlap
    let overlap = true;
    while (overlap) {
        overlap = false;
        plane.forEach(part1 => {
            plane.forEach(part2 => {
                if (part1.type !== part2.type) {
                    part1.cells.forEach(cell1 => {
                        part2.cells.forEach(cell2 => {
                            if (cell1.x === cell2.x && cell1.y === cell2.y) {
                                overlap = true;
                            }
                        });
                    });
                }
            });
        });

        if (overlap) {
            plane = PLANE_PARTS.map(part => {
                const newPart = { type: part.type, cells: [] };
                part.cells.forEach(cell => {
                    newPart.cells.push({ x: getRandomInt(GRID_SIZE), y: getRandomInt(GRID_SIZE) });
                });
                return newPart;
            });
        }
    }

    // Save plane cells
    planeCells = [];
    plane.forEach(part => {
        part.cells.forEach(cell => {
            planeCells.push(cell);
        });
    });
}

function checkCell(index) {
    const cell = document.querySelectorAll('.grid div')[index];
    const cellX = index % GRID_SIZE;
    const cellY = Math.floor(index / GRID_SIZE);

    let found = false;
    planeCells.forEach(planeCell => {
        if (planeCell.x === cellX && planeCell.y === cellY) {
            cell.style.backgroundColor = 'green';
            found = true;
        }
    });

    if (found) {
        let allFound = true;
        planeCells.forEach(planeCell => {
            const foundCell = document.querySelector(`.grid div:nth-child(${planeCell.y * GRID_SIZE + planeCell.x + 1})`);
            if (foundCell.style.backgroundColor !== 'green') {
                allFound = false;
            }
        });

        if (allFound) {
            const quotes = [    "This time, Mr. Bond, the pleasure will be all mine.",    "That gun, it looks more fitting for a woman.",    "Can I do something for you, Mr. Bond?",    "You can die there, or you can die on top of me. Your choice.",    "I thought Christmas only comes once a year.",    "How's that for a punchline?",    "Moneypenny, what gives?",    "No more foreplay.",    "I have a slight inferiority complex.",    "Don't touch that! That's my lunch.",    "For England, James?",    "That's because you know what I can do with my little finger, don't you?",    "The bitch is dead.",    "I never miss.",    "My name is Pussy Galore.",    "I have been known to keep my tip up.",    "You're a rare breed, Mr. Bond.",    "I'm sorry. That last hand... nearly killed me.",    "I think he's attempting re-entry, sir.",    "I'm afraid that's become rather inelegant.",    "Do you expect me to talk?",    "No, Mr. Bond. I expect you to die!",    "This never happened to the other fellow."  ];
            const quote = quotes[getRandomInt(quotes.length)];
            document.querySelector('.message').textContent = quote;
        }
    }
}

function startGame() {
    document.querySelector('.intro').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    generatePlane();
    let timerId = setInterval(() => {
        timeLeft--;
        document.querySelector('.timer').textContent = `Time left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timerId);
            document.querySelector('.timer').textContent = 'Time elapsed';
        }
    }, 1000);
}

// Initialize game
createGrid();
document.querySelector('.start-button').addEventListener('click', startGame);
