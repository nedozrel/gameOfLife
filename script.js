let mainContainer = document.querySelector('.main-container')
let button = document.querySelector('.start-life');
let fillRandom = document.querySelector('.fill-random');
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let sizeSetting = document.querySelector('.size-setting');
mainContainer.style.width = canvas.offsetWidth + sizeSetting.offsetWidth + 5;
let eraser = document.querySelector('.eraser-mode'); 
let cellSize = 5;
let draw = false;

let cells = [];

function createNewMassive() {
    cells = [];
    for (let i=0; i < Math.floor(500 / cellSize); i++) {
        cells[i] = [];
        for (let j=0; j < Math.floor(500 / cellSize); j++) {
            cells[i][j] = 0;
        }
    }
}

createNewMassive()

sizeSetting.onchange = function () {
    let newCellSize = sizeSetting.value;
    cellsNext = [];
    for (let i=0; i < Math.floor(500 / newCellSize); i++) {
        cellsNext[i] = [];
        for (let j=0; j < Math.floor(500 / newCellSize); j++) {
            if (i < Math.floor(500 / cellSize) && j < Math.floor(500 / cellSize)) {
                if (cells[i][j] === 1) {
                    cellsNext[i][j] = 1;
                } else {
                    cellsNext[i][j] = 0;
                }
            } else {
                cellsNext[i][j] = 0;
            }
        }
    }
    cellSize = newCellSize
    cells = cellsNext
    drawCells();
}

function drawRects(event) {
    let x = event.offsetX;
    let y = event.offsetY;
    let i = Math.floor(y / cellSize);
    let j = Math.floor(x / cellSize);
    if (eraser.checked) {
        cells[i][j] = 0;
    } else {
        cells[i][j] = 1;
    }
    drawCells();
}

canvas.onclick = function(event) {
    drawRects(event);
}

canvas.onmousemove = function (event) {
    if (event.which === 1) {
        drawRects(event);
    }

}

function drawCells() {
    ctx.clearRect(0, 0, 500, 500);
    for (let i=0; i < Math.floor(500 / cellSize); i++) {
        for (let j=0; j < Math.floor(500 / cellSize); j++) {
            if (cells[i][j] === 1) {
                ctx.fillRect(j*cellSize, i*cellSize, cellSize, cellSize)
            }
        }
    }
}

function CNN(a) { // Check next neighbor
    if (a === Math.floor(500 / cellSize) - 1) return -1 ; else return a;
}

function CPN(a) { // Check previous neighbor
    if (a === 0) return Math.floor(500 / cellSize); else return a;
}

function countNeighbors(i, j) {
    let neighborCounter;
    neighborCounter = cells[CPN(i)-1][CPN(j)-1] + cells[CPN(i)-1][j] + cells[CPN(i)-1][CNN(j)+1]; // neighbors from above
    neighborCounter = neighborCounter + cells[i][CPN(j)-1] + cells[i][CNN(j)+1]; // neighbors on the sides
    neighborCounter = neighborCounter + cells[CNN(i)+1][CPN(j)-1] + cells[CNN(i)+1][j] + cells[CNN(i)+1][CNN(j)+1];
    return neighborCounter;
}

function startLife() {
    let cells2 = [];
    for (let i=0; i < Math.floor(500 / cellSize); i++) {
        cells2[i] = [];
        for (let j=0; j < Math.floor(500 / cellSize); j++) {
            let numOfNighbors = countNeighbors(i, j);
            if ((numOfNighbors === 3 || numOfNighbors === 2) && cells[i][j] === 1) {
                cells2[i][j] = 1;
            } else if (numOfNighbors === 3 && cells[i][j] === 0) {
                cells2[i][j] = 1;
            } else {
                cells2[i][j] = 0;
            }
        }
    }
    cells = cells2;
    drawCells();
}

button.onclick = function () {
    button.disabled = true;
    fillRandom.disabled = true;
    setInterval(startLife, 100);
}

fillRandom.onclick = function() {
    cells = [];
    for (let i=0; i < Math.floor(500 / cellSize); i++) {
        cells[i] = [];
        for (let j=0; j < Math.floor(500 / cellSize); j++) {
             cells[i][j] = Math.floor(Math.random() * 2);
        }
    }
    console.log('jopa');
    drawCells();
}