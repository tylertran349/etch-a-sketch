const grid = document.querySelector('#grid');
let color = "black";
let gridSquareSize;

function changeToBlack() {
    color = "black";
}

function changeToRainbow() {
    color = "rainbow";
}

function changeToEraser() {
    color = "eraser";
}

// Generate random RGB color parameter between 0 to 255
function randomColorParameter() {
    return Math.floor(Math.random() * (255 - 0) + 0);
}

function generateGrid(gridSideLength) {
    gridSquareSize = 512 / gridSideLength;
    // Create columns
    for(let i = 0; i < gridSideLength; i++) {
        gridColumn = document.createElement('div');
        gridColumn.classList.add('grid-column');
        grid.appendChild(gridColumn);
    
        // Create individual grid squares
        for(let i = 0; i < gridSideLength; i++) {
            gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-square');
            gridSquare.style.background = 'white';
            gridSquare.style.height = gridSquareSize + "px";
            gridSquare.style.width = gridSquareSize + "px";
            gridColumn.appendChild(gridSquare);
        }
    }
}

// Generate default grid on page load
generateGrid(16);

// Get a nodelist of all grid squares
squares = document.querySelectorAll('.grid-square');

// Get a nodelist of all grid columns
columns = document.querySelectorAll('.grid-column');

// Deletes current grid
function deleteGrid() {
    columns = document.querySelectorAll('.grid-column');
    columns.forEach((column) => {
        column.remove();
    });
}

// Attach event listeners to each grid square that make a square black if hovered over
function attachListeners() {
    squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
        square.addEventListener('mouseover', () => {
            console.log('Hovered');
            if(color == "black") {
                square.style.background = 'black';
            } 
            else if(color == "rainbow") {
                square.style.background = '#' + randomColorParameter().toString(16) + randomColorParameter().toString(16) + randomColorParameter().toString(16);
            } else if(color == "eraser") {
                square.style.background = 'white';
            }
        });
    });
}

// Deletes current grid, generates a new grid, and attaches event listeners to new grid
function regenerateGrid(newSize) {
    deleteGrid();
    generateGrid(newSize);
    attachListeners();
}

// Attach event listeners for default grid
attachListeners();

slider = document.getElementById("actualRange");
rangeOutput = document.getElementById("current-size");

// Output default slider value
rangeOutput.innerHTML = slider.value + " x " + slider.value;

// Update slider value each time you drag the slider handle
slider.oninput = function() {
    rangeOutput.innerHTML = this.value + " x " + this.value;
    regenerateGrid(this.value);
}

function resetGrid() {
    squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
        square.style.background = 'white';
    });
}