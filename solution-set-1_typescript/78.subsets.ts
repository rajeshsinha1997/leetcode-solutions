/*
 * @lc app=leetcode id=78 lang=typescript
 *
 * [78] Subsets
 */

// @lc code=start
/**
 * Backtrack through the nums array to find all subsets
 * @param nums an array of numbers for which we want to find all subsets
 * @param currentInd the current index in the nums array
 * @param currentSubset the current subset being constructed
 * @param result the array of all subsets
 */
function backtrack(
  nums: number[],
  currentInd: number,
  currentSubset: number[],
  result: number[][]
) {
  // check if we have reached the end of the original array
  if (currentInd === nums.length) {
    // add the current subset to the result array
    result.push([...currentSubset]);
  } else {
    // add the current number to the subset
    currentSubset.push(nums[currentInd]);
    // recursively call backtrack with the next index
    backtrack(nums, currentInd + 1, currentSubset, result);
    // backtrack by removing the last element
    currentSubset.pop();
    // recursively call backtrack without the current number
    backtrack(nums, currentInd + 1, currentSubset, result);
  }
}

function subsets(nums: number[]): number[][] {
  // create a result array that will hold all subsets and add the empty set and the full set
  const result: number[][] = [];

  // start the backtracking process from index 0
  backtrack(nums, 0, [], result);

  // return the result array containing all subsets
  return result;
}
// @lc code=end
