const DEFAULT_COLOR = "#000000";
const DEFAULT_BG_COLOR = "rgb(255, 255, 255)";
const COLOR_MODE = "color";
const RAINBOW_MODE = "rainbow";
const DEFAULT_SQUARES_PER_SIDE = 16;
const GRADIENT_STEP = Math.floor(255 * 0.1);

let currentColor = DEFAULT_COLOR;
let currentBgColor = DEFAULT_BG_COLOR;
let currentMode = COLOR_MODE;
let currentSquarePerSide = DEFAULT_SQUARES_PER_SIDE;
// 0: no gradient; 1: brighten; -1: darken
let gradientMode = 0;

const btnSize = document.querySelector("#btn-size");
const btnColor = document.querySelector("#btn-color");
const btnRainbow = document.querySelector("#btn-rainbow");
const btnGradient = document.querySelector("#btn-gradient");
const btnClear = document.querySelector("#btn-clear");

btnColor.onclick = () => setCurrentMode(COLOR_MODE);
btnRainbow.onclick = () => setCurrentMode(RAINBOW_MODE);
btnGradient.onclick = () => setGradientMode(-1);
btnClear.onclick = () => setupGrid();

btnSize.addEventListener("click", () => {
  let squarePerSide = prompt("Enter the number of squares per side:");
  currentSquarePerSide = parseInt(squarePerSide);
  if (!currentSquarePerSide || currentSquarePerSide > 100) {
    alert("The number of squares per side should be an integer between 1 and 100.");
    return;
  }
  if (currentSquarePerSide) {
    setupGrid();
  }
});

createGrid(currentSquarePerSide);

/**
 * Create a grid of squares
 *
 * @param { number } squarePerSide
 */
function createGrid(squarePerSide) {
  const grid = document.querySelector(".grid");
  grid.style.gridTemplateColumns = `repeat(${squarePerSide}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${squarePerSide}, 1fr)`;
  for (let i = 0; i < squarePerSide * squarePerSide; i++) {
    const square = createSquare();
    grid.appendChild(square);
  }
}

/**
 * Create a single square div
 *
 */
function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.backgroundColor = currentBgColor;
  square.addEventListener("mouseover", () => {
    if (currentMode === COLOR_MODE) {
      if (gradientMode) {
        adjustSquare(square);
      } else {
        square.style.backgroundColor = currentColor;
      }
    } else if (currentMode === RAINBOW_MODE) {
      square.style.backgroundColor = getRandomColor();
    }
  });
  return square;
}

function clearGrid() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
}

function setupGrid() {
  clearGrid();
  createGrid(currentSquarePerSide);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
}

function setCurrentMode(mode) {
  currentMode = mode;
}

function setGradientMode(mode) {
  gradientMode = mode;
}

function adjustSquare(square) {
  let bgColorRGB = getComputedStyle(square).backgroundColor;
  console.log(bgColorRGB);
  if (!bgColorRGB) {
    bgColorRGB = DEFAULT_BG_COLOR;
  }
  let { r, g, b } = extractRGB(bgColorRGB);
  r = adjustColorChannel(r);
  g = adjustColorChannel(g);
  b = adjustColorChannel(b);
  square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function adjustColorChannel(code) {
  code = code + GRADIENT_STEP * gradientMode;

  return pickValidColor(code);
}

function pickValidColor(color) {
  if (color < 0) {
    return 0;
  }
  if (color > 255) {
    return 255;
  }
  return color;
}

function extractRGB(colorProp) {
  const match = colorProp.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
    };
  }
  return null;
}
