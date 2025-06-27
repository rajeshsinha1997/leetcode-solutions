/*
 * @lc app=leetcode id=39 lang=typescript
 *
 * [39] Combination Sum
 */

// @lc code=start
function combinationSum(candidates: number[], target: number): number[][] {
  // create a result array to hold the combinations
  let result: number[][] = [];

  // sort the given array
  candidates.sort((a, b) => a - b);

  // call the backtrack function to find all combinations
  backtrack(0, candidates, target, [], 0, result);

  // return the result array
  return result;
}

/**
 * This function uses backtracking to find all combinations of candidates that sum up to the target.
 * @param currentIndex index of the current candidate being considered
 * @param candidates array of candidate numbers
 * @param target the target sum
 * @param currentSumArray array to hold the current combination
 * @param currentSum the current sum
 * @param result array to hold all the valid combinations
 * @returns void
 */
function backtrack(
  currentIndex: number,
  candidates: number[],
  target: number,
  currentSumArray: number[],
  currentSum: number,
  result: number[][]
) {
  // check if the current sum is equal to the target
  if (currentSum === target) {
    // if it is, push the current sum array to the result array
    result.push([...currentSumArray]);
  }
  // otherwise, if the current sum is not equal to the target
  else {
    // iterate through the candidates array
    for (let ind = currentIndex; ind < candidates.length; ind++) {
      // check if the current sum plus the current candidate is greater than the target
      if (currentSum + candidates[ind] > target) {
        // if it is, break the loop as the candidates are sorted and all subsequent candidates will also be greater
        break;
      } else {
        // add the candidate to the current sum array
        currentSumArray.push(candidates[ind]);

        // call the backtrack function recursively with the updated current sum and current sum array
        backtrack(
          ind,
          candidates,
          target,
          currentSumArray,
          currentSum + candidates[ind],
          result
        );

        // remove the last element from the current sum array
        currentSumArray.pop();
      }
    }
  }
}
// @lc code=end
