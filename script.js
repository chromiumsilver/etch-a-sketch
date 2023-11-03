const DEFAULT_COLOR = "rgb(0, 0, 0)";
const DEFAULT_BG_COLOR = "rgb(255, 255, 255)";
const COLOR_MODE = "color";
const RAINBOW_MODE = "rainbow";
const DEFAULT_SQUARES_PER_SIDE = 16;
const GRADIENT_STEP = Math.floor(255 * 0.1);
const GRADIENT_OFF = 0;
const GRADIENT_DARKEN_MODE = -1;
const GRADIENT_BRIGHTEN_MODE = 1;

let currentColor = DEFAULT_COLOR;
let currentBgColor = DEFAULT_BG_COLOR;
let currentMode = COLOR_MODE;
let currentSquarePerSide = DEFAULT_SQUARES_PER_SIDE;
let gradientMode = GRADIENT_OFF;

const btnSize = document.querySelector("#btn-size");
const btnColor = document.querySelector("#btn-color");
const btnRainbow = document.querySelector("#btn-rainbow");
const btnDarken = document.querySelector("#btn-darken");
const btnBrighten = document.querySelector("#btn-brighten");
const btnClear = document.querySelector("#btn-clear");

btnColor.onclick = () => setCurrentMode(COLOR_MODE);
btnRainbow.onclick = () => setCurrentMode(RAINBOW_MODE);
btnDarken.onclick = () => setGradientMode(GRADIENT_DARKEN_MODE);
btnBrighten.onclick = () => setGradientMode(GRADIENT_BRIGHTEN_MODE);
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

setupGrid();

function setCurrentMode(mode) {
  currentMode = mode;
}

function setGradientMode(mode) {
  gradientMode = mode;
}

function createGrid(squarePerSide) {
  const grid = document.querySelector(".grid");
  grid.style.gridTemplateColumns = `repeat(${squarePerSide}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${squarePerSide}, 1fr)`;
  for (let i = 0; i < squarePerSide * squarePerSide; i++) {
    const square = createSquare();
    grid.appendChild(square);
  }
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.backgroundColor = currentBgColor;
  square.addEventListener("mouseover", () => changeSquareBgColor(square));
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

function changeSquareBgColor(square) {
  let squareBgColor = getComputedStyle(square).backgroundColor;
  if (currentMode === COLOR_MODE) {
    if (gradientMode) {
      squareBgColor = adjustColor(squareBgColor);
    } else {
      squareBgColor = currentColor;
    }
  } else if (currentMode === RAINBOW_MODE) {
    squareBgColor = getRandomColor();
  }
  square.style.backgroundColor = squareBgColor;
}

function adjustColor(color) {
  if (!color) {
    color = currentBgColor;
  }
  let { r, g, b } = extractRGB(color);
  r = adjustColorChannel(r);
  g = adjustColorChannel(g);
  b = adjustColorChannel(b);
  return `rgb(${r}, ${g}, ${b})`;
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
