/*
 * @lc app=leetcode id=216 lang=typescript
 *
 * [216] Combination Sum III
 */

// @lc code=start
function combinationSum3(k: number, n: number): number[][] {
  // create a result array to hold the combinations
  let result: number[][] = [];

  // call the backtrack function to find all combinations
  // starting from the first number (1) and the remaining sum (n)
  backtrack(1, n, [], k, result);

  // return the result array
  return result;
}

function backtrack(
  currentNumber: number,
  remainingSum: number,
  currentArray: number[],
  requiredArrayLength: number,
  resultArray: number[][]
) {
  // if the remaining sum is 0 and the current array has the required length,
  if (
    currentArray.length < requiredArrayLength &&
    remainingSum > 0 &&
    currentNumber <= remainingSum
  ) {
    // iterate through the numbers from currentNumber to 9
    for (let num = currentNumber; num < 10; num++) {
      // check if the number is greater than the remaining sum
      if (num > remainingSum) {
        // break out of the loop
        break;
      }

      // add the number to the current array
      currentArray.push(num);
      // call the backtrack function recursively
      // with the next number, reduced remaining sum, current array,
      backtrack(
        num + 1,
        remainingSum - num,
        currentArray,
        requiredArrayLength,
        resultArray
      );
      // remove the last number from the current array
      currentArray.pop();
    }
  }
  // otherwise, if the current array has the required length and the remaining sum is 0,
  else if (currentArray.length === requiredArrayLength && remainingSum === 0) {
    // push a copy of the current array to the result array
    resultArray.push([...currentArray]);
  }
}
// @lc code=end
