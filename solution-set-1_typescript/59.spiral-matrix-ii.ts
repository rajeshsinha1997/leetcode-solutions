/*
 * @lc app=leetcode id=59 lang=typescript
 *
 * [59] Spiral Matrix II
 */

// @lc code=start
function generateMatrix(n: number): number[][] {
  // create a 2D array filled with zeros
  const result: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  // define the boundaries for the spiral filling
  let topRowBound = 0;
  let bottomRowBound = n - 1;
  let leftColBound = 0;
  let rightColBound = n - 1;

  // define the starting and the final values
  let currentValue = 1;
  const finalValue = n * n;

  // loop until we reach the final value
  while (currentValue <= finalValue) {
    // fill the top row from left to right
    for (let col = leftColBound; col <= rightColBound; col++) {
      result[topRowBound][col] = currentValue++;
    }

    // move the top boundary down
    topRowBound++;

    // fill the right column from top to bottom
    for (let row = topRowBound; row <= bottomRowBound; row++) {
      result[row][rightColBound] = currentValue++;
    }

    // move the right boundary left
    rightColBound--;

    // fill the bottom row from right to left
    for (let col = rightColBound; col >= leftColBound; col--) {
      result[bottomRowBound][col] = currentValue++;
    }

    // move the bottom boundary up
    bottomRowBound--;

    // fill the left column from bottom to top
    for (let row = bottomRowBound; row >= topRowBound; row--) {
      result[row][leftColBound] = currentValue++;
    }

    // move the left boundary right
    leftColBound++;
  }

  // return the filled 2D array
  return result;
}
// @lc code=end
