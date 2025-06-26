/*
 * @lc app=leetcode id=118 lang=typescript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
function generate(numRows: number): number[][] {
  // Create the result array
  const result: number[][] = [];

  // Check if the expected number of rows is greater than 0
  if (numRows > 0) {
    // Push the first row
    result.push([1]);
  }

  // Check if the expected number of rows is greater than 1
  if (numRows > 1) {
    // Push the second row
    result.push([1, 1]);
  }

  // Check if the expected number of rows is greater than 2
  if (numRows > 2) {
    // Iterate over the remaining rows starting from the third row
    for (let row = 2; row < numRows; row++) {
      // Create a temporary array to hold the current row's values
      let temp: number[] = [];

      // Iterate over the columns of the current row
      for (let col = 0; col <= row; col++) {
        // Check if the current column is the first or last column
        if (col === 0 || col === row) {
          // If it is, push 1 to the temporary array
          temp.push(1);
        } else {
          // If it's not, calculate the value based on the previous row
          // The value is the sum of the two values above it
          temp.push(result[row - 1][col - 1] + result[row - 1][col]);
        }
      }

      // Push the current row to the result array
      result.push(temp);
    }
  }

  // Return the final result
  return result;
}
// @lc code=end
