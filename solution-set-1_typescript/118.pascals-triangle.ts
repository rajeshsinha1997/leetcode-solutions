/*
 * @lc app=leetcode id=118 lang=typescript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
function generate(numRows: number): number[][] {
  // Create the result array
  const result: number[][] = [];

  // Iterate over the rows starting from the first row
  for (let row = 0; row < numRows; row++) {
    // Create a temporary array to hold the current row's values
    let temp: number[] = [1];

    // Iterate over the columns of the current row
    for (let col = 1; col <= row; col++) {
      // Calculate the value of the current column based on the previous row
      // values and push it to the temporary array
      // Push 1 instead if the current column is the last column
      temp.push(
        col === row ? 1 : result[row - 1][col - 1] + result[row - 1][col]
      );
    }

    // Push the current row to the result array
    result.push(temp);
  }

  // Return the final result
  return result;
}
// @lc code=end
