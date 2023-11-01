const btn = document.querySelector(".btn");
btn.addEventListener("click", () => {
  let squarePerSide = prompt("Enter the number of squares per side:");
  squarePerSide = parseInt(squarePerSide);
  if (!squarePerSide || squarePerSide > 100) {
    alert("The number of squares per side should be an integer between 1 and 100.");
    return;
  }
  if (squarePerSide) {
    clearGrid();
    createSquares(squarePerSide);
  }
});

createSquares(16);

/**
 * Create a grid of squares
 *
 * @param { number } squarePerSide
 */
function createSquares(squarePerSide) {
  const grid = document.querySelector(".grid");
  grid.style.gridTemplateColumns = `repeat(${squarePerSide}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${squarePerSide}, 1fr)`;
  for (let i = 0; i < squarePerSide; i++) {
    for (let j = 0; j < squarePerSide; j++) {
      const square = createSquare();
      grid.appendChild(square);
    }
  }
}

/**
 * Create a single square div
 *
 */
function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  square.addEventListener("mouseover", () => {
    square.classList.add("square--black");
  });
  return square;
}

function clearGrid() {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
}
