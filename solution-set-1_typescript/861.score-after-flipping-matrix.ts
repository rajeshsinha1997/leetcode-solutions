/*
 * @lc app=leetcode id=861 lang=typescript
 *
 * [861] Score After Flipping Matrix
 */

// @lc code=start
function matrixScore(grid: number[][]): number {
  // variable to store the final scores
  let score = 0;

  // iterate over the rows of the grid
  for (let row = 0; row < grid.length; row++) {
    // check if the first element (most significant bit) is 0
    if (grid[row][0] === 0) {
      // iterate over the columns of the specific row
      for (let ind = 0; ind < grid[row].length; ind++) {
        // flip the bit
        grid[row][ind] = 1 - grid[row][ind];
      }
    }
  }

  // calculate the score for the first column and add it to the total score
  // since the first column is now guaranteed to be all 1s, we can calculate
  // the score as the number of rows multiplied by 2 raised to the power of
  // the number of columns minus 1 (since the first column is already counted)
  score += grid.length * (1 << (grid[0].length - 1));

  // iterate over the columns of the grid starting from the second column
  for (let col = 1; col < grid[0].length; col++) {
    // variable to count the number of 1s in the current column
    let countOfOnes = 0;

    // iterate over each cell of the current column to count number of 1s
    for (let row = 0; row < grid.length; row++) {
      // if the current cell is 1
      if (grid[row][col] === 1) {
        // increment the count of 1s
        countOfOnes++;
      }
    }

    // check if the number of 1s is less than the number of 0s
    if (countOfOnes < grid.length - countOfOnes) {
      // iterate over the rows of the specific column
      for (let row = 0; row < grid.length; row++) {
        // flip the bit in the current cell
        grid[row][col] = 1 - grid[row][col];
      }
    }
  }

  // iterate over the rows of the grid to calculate the score
  for (let row = 0; row < grid.length; row++) {
    // iterate over the columns of the specific row starting from the second column
    // since the first column is already counted
    for (let col = 1; col < grid[row].length; col++) {
      // calculate the score for current cell and add it to the total score
      score += grid[row][col] << (grid[row].length - col - 1);
    }
  }

  // return the final score
  return score;
}
// @lc code=end
