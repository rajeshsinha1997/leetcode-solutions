/*
 * @lc app=leetcode id=48 lang=typescript
 *
 * [48] Rotate Image
 */

// @lc code=start
/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
  // iterate over each row of the matrix
  for (let row = 0; row < matrix.length; row++) {
    // iterate over the columns of the current row
    for (let col = row + 1; col < matrix[row].length; col++) {
      // swap the elements to transpose the matrix
      [matrix[row][col], matrix[col][row]] = [
        matrix[col][row],
        matrix[row][col],
      ];
    }
  }

  // iterate over the rows of the transposed matrix
  for (let row = 0; row < matrix.length; row++) {
    // create two pointers for the current row
    let startPointer = 0;
    let endPointer = matrix[0].length - 1;

    // loop until the two pointers meet
    while (startPointer < endPointer) {
      // swap the elements pointed by the two pointers
      [matrix[row][startPointer], matrix[row][endPointer]] = [
        matrix[row][endPointer],
        matrix[row][startPointer],
      ];

      // move the pointers towards the center
      startPointer++;
      endPointer--;
    }
  }
}
// @lc code=end
