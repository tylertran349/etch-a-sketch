const grid = document.querySelector('#grid');
let color = "custom";
let gridSquareSize;

function changeToColorMode() {
    color = "custom";
    document.querySelector('.custom').setAttribute('style', 'background-color: black; color: #87f2bf;'); // Invert button color when pressed
    document.querySelector('.rainbow').setAttribute('style', 'background-color: transparent;  color: black;'); // Revert colors of other buttons when pressed
    document.querySelector('.eraser').setAttribute('style', 'background-color: transparent;  color: black;'); // Revert colors of other buttons when pressed
}

function changeToRainbow() {
    color = "rainbow";
    document.querySelector('.rainbow').setAttribute('style', 'background-color: black;  color: #87f0c1;'); // Invert button color when pressed
    document.querySelector('.custom').setAttribute('style', 'background-color: transparent;  color: black;'); // Revert colors of other buttons when pressed
    document.querySelector('.eraser').setAttribute('style', 'background-color: transparent;  color: black;'); // Revert colors of other buttons when pressed
}

function changeToEraser() {
    color = "eraser";
    document.querySelector('.eraser').setAttribute('style', 'background-color: black;  color: #88eec6;'); // Invert button color when pressed
    document.querySelector('.custom').setAttribute('style', 'background-color: transparent;  color: black;'); // Revert colors of other buttons when pressed
    document.querySelector('.rainbow').setAttribute('style', 'background-color: transparent;  color: black;'); // Revert colors of other buttons when pressed
}

// Generate random RGB color parameter between 0 to 255
function randomColorParameter() {
    return Math.floor(Math.random() * (255 - 0) + 0);
}

function generateGrid(numGridSquares) {
    gridSquareSize = grid.clientWidth / numGridSquares;
    // Create columns
    for(let i = 0; i < numGridSquares; i++) {
        gridColumn = document.createElement('div');
        gridColumn.classList.add('grid-column');
        grid.appendChild(gridColumn);
    
        // Create individual grid squares
        for(let i = 0; i < numGridSquares; i++) {
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
generateGrid(48);

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

// Attach event listeners to each grid square that make a square custom if hovered over
function attachListeners() {
    squares = document.querySelectorAll('.grid-square');
    squares.forEach((square) => {
        square.addEventListener('mouseover', () => {
            console.log('Hovered');
            if(color == "custom") {
                square.style.background = document.getElementById("color-picker").value; // Sets grid square color to be current color selected in the color picker
            } else if(color == "rainbow") {
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