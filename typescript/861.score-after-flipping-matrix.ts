/*
 * @lc app=leetcode id=861 lang=typescript
 *
 * [861] Score After Flipping Matrix
 */

// @lc code=start
function matrixScore(grid: number[][]): number {
  // variable to store the final scores
  let score = 0;

  // considering all the cells in the first column will be flipped to 1,
  // calculate the score and add it to the final score
  score += grid.length * (1 << (grid[0].length - 1));

  // iterate through each column starting from the second column
  for (let col = 1; col < grid[0].length; col++) {
    // variable to count the number of 1s and 0s in the current column
    let countOfOne = 0;
    let countOfZero = 0;

    // iterate through each row to count the number of 1s in the current column
    for (let row = 0; row < grid.length; row++) {
      // if the value in the current cell and the first cell of the row are the same,
      if (grid[row][col] === grid[row][0]) {
        // increment the count of 1s
        countOfOne++;
      } else {
        // otherwise, increment the count of 0s
        countOfZero++;
      }
    }

    // calculate the score for the current column and add it to the final score
    score +=
      Math.max(countOfOne, countOfZero) * (1 << (grid[0].length - col - 1));
  }

  // return the final score
  return score;
}
// @lc code=end
