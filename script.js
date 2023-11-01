/**
 * Create a num * num grid of squares
 *
 * @param { number } num
 * @param { number } width
 */
function createSquares(num, width) {
  const board = document.querySelector(".board");
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const square = createSquare(width);
      board.appendChild(square);
    }
  }
}

/**
 * Create a single square div
 *
 * @param { number } width
 */
function createSquare(width) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.addEventListener("mouseover", () => {
    square.style.backgroundColor = "black";
  });
  return square;
}

createSquares(16, 50);
