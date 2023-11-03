const DEFAULT_COLOR = "rgb(0, 0, 0)";
const DEFAULT_BG_COLOR = "rgb(255, 255, 255)";
const DEFAULT_SQUARES_PER_SIDE = 16;
const COLOR_MODE = "color";
const RAINBOW_MODE = "rainbow";
const GRADIENT_DARKEN_MODE = "darken";
const GRADIENT_BRIGHTEN_MODE = "brighten";
const ERASER_MODE = "eraser";
const GRADIENT_STEP = Math.floor(255 * 0.1);

let currentColor = DEFAULT_COLOR;
let currentBgColor = DEFAULT_BG_COLOR;
let currentMode = COLOR_MODE;
let selectedBtn = null;
let currentSquarePerSide = DEFAULT_SQUARES_PER_SIDE;
let gradientSign = 0;

const btnSize = document.querySelector("#btn-size");

const btnColor = document.querySelector("#btn-color");
const btnRainbow = document.querySelector("#btn-rainbow");
const btnDarken = document.querySelector("#btn-darken");
const btnBrighten = document.querySelector("#btn-brighten");
const btnEraser = document.querySelector("#btn-eraser");

const btnClear = document.querySelector("#btn-clear");

btnColor.onclick = () => setCurrentMode(COLOR_MODE, btnColor);
btnRainbow.onclick = () => setCurrentMode(RAINBOW_MODE, btnRainbow);
btnDarken.onclick = () => setCurrentMode(GRADIENT_DARKEN_MODE, btnDarken);
btnBrighten.onclick = () => setCurrentMode(GRADIENT_BRIGHTEN_MODE, btnBrighten);
btnEraser.onclick = () => setCurrentMode(ERASER_MODE, btnEraser);

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

init();

function init() {
  setupGrid();
  setCurrentMode(COLOR_MODE, btnColor);
}

function setCurrentMode(mode, clickedBtn) {
  currentMode = mode;
  if (mode === GRADIENT_DARKEN_MODE) {
    gradientSign = -1;
  }
  if (mode === GRADIENT_BRIGHTEN_MODE) {
    gradientSign = 1;
  }
  activateBtn(clickedBtn);
}

function activateBtn(button) {
  if (selectedBtn === button) {
    return;
  }
  if (selectedBtn) {
    selectedBtn.classList.remove("btn--active");
  }
  button.classList.add("btn--active");
  selectedBtn = button;
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
  switch (currentMode) {
    case RAINBOW_MODE:
      squareBgColor = getRandomColor();
      break;
    case GRADIENT_DARKEN_MODE:
    case GRADIENT_BRIGHTEN_MODE:
      squareBgColor = adjustColor(squareBgColor);
      break;
    case ERASER_MODE:
      squareBgColor = currentBgColor;
      break;
    default:
      squareBgColor = currentColor;
      break;
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
  code = code + GRADIENT_STEP * gradientSign;
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
