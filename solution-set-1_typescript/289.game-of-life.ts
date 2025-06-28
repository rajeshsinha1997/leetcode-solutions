/*
 * @lc app=leetcode id=289 lang=typescript
 *
 * [289] Game of Life
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function gameOfLife(board: number[][]): void {
  // iterate over the rows of the board
  for (let row = 0; row < board.length; row++) {
    // iterate over the columns of the current row
    for (let col = 0; col < board[row].length; col++) {
      // get the number of surrounding living cells
      const numberOfSurroundingLivingCells = getSurroundingLivingCellCount(
        board,
        row,
        col
      );

      // check if the current cell is a live cell (1) and apply the rules of the Game of Life
      if (
        board[row][col] === 1 &&
        (numberOfSurroundingLivingCells < 2 ||
          numberOfSurroundingLivingCells > 3)
      ) {
        // the cell dies due to underpopulation or overpopulation
        // mark the cell as dead (-1) to indicate it was alive but will die in the next generation
        board[row][col] = -1;
      }
      // otherwise, check if the current cell is a dead cell (0) and apply the reproduction rule
      else if (board[row][col] == 0 && numberOfSurroundingLivingCells === 3) {
        // the cell becomes alive due to reproduction
        // mark the cell as alive (2) to indicate it was dead but will become alive
        board[row][col] = 2;
      }
    }
  }

  // iterate over the rows of the board again to update the cells based on the marks
  for (let row = 0; row < board.length; row++) {
    // iterate over the columns of the current row
    for (let col = 0; col < board[row].length; col++) {
      // check if the cell was marked as dead (-1)
      if (board[row][col] === -1) {
        // change the cell to dead (0)
        board[row][col] = 0;
      }
      // otherwise, check if the cell was marked as alive (2)
      else if (board[row][col] === 2) {
        // change the cell to alive (1)
        board[row][col] = 1;
      }
    }
  }
}

/**
 * Get the count of surrounding living cells for a given cell in the grid.
 * @param grid The game board grid.
 * @param currentRow The row index of the current cell.
 * @param currentCol The column index of the current cell.
 * @returns The count of surrounding living cells.
 */
function getSurroundingLivingCellCount(
  grid: number[][],
  currentRow: number,
  currentCol: number
): number {
  // Initialize count of surrounding living cells
  let count = 0;

  // Iterate through the surrounding cells in a 3x3 grid centered at (currentRow, currentCol)
  for (let r = currentRow - 1; r <= currentRow + 1; r++) {
    for (let c = currentCol - 1; c <= currentCol + 1; c++) {
      if (r === currentRow && c === currentCol) {
        // Skip the current cell itself
        continue;
      }
      // otherwise, check if the cell is within bounds and not the current cell
      else if (r >= 0 && r < grid.length && c >= 0 && c < grid[r].length) {
        // Increment count if the cell is a live cell (1)
        count += Math.abs(grid[r][c]) === 1 ? 1 : 0;
      }
    }
  }

  // return the count of surrounding living cells
  return count;
}
// @lc code=end
