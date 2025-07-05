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

/**
 * Generate all subsets of a given set of numbers using bitmasking
 * @param nums an array of numbers for which we want to find all subsets
 * @param result the array of all subsets
 */
function bitmask(nums: number[], result: number[][]) {
  // calculate the total number of subsets
  const totalNumberOfSubsets = 1 << nums.length;

  // iterate through all possible subset numbers
  for (let subsetInd = 0; subsetInd < totalNumberOfSubsets; subsetInd++) {
    // create a new subset
    const subset: number[] = [];

    // variable to track the position of the set bit in the subset index
    let bitPos = 0;

    // iterate through each bit position in the subset index
    while (bitPos < nums.length) {
      // check if the bit at the current position is set
      if (subsetInd & (1 << bitPos)) {
        // if the bit is set, add the corresponding number to the subset
        subset.push(nums[bitPos]);
      }

      // move to the next bit position
      bitPos++;
    }

    // add the constructed subset to the result array
    result.push(subset);
  }
}

function subsets(nums: number[]): number[][] {
  // create a result array that will hold all subsets and add the empty set and the full set
  const result: number[][] = [];

  // start the backtracking process from index 0
  // backtrack(nums, 0, [], result);

  // alternatively, you can use the bitmasking approach
  bitmask(nums, result);

  // return the result array containing all subsets
  return result;
}
// @lc code=end
