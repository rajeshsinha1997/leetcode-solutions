/*
 * @lc app=leetcode id=442 lang=typescript
 *
 * [442] Find All Duplicates in an Array
 */

// @lc code=start
function findDuplicates(nums: number[]): number[] {
  // Create an array to store the result
  let result: number[] = [];

  // Iterate through the given array
  for (let ind = 0; ind < nums.length; ind++) {
    // Get the index corresponding to the current number
    const index = Math.abs(nums[ind]) - 1;

    if (nums[index] < 0) {
      // If the value is negative, it means we've seen this number before
      result.push(Math.abs(nums[ind]));
    }

    // Mark the number as visited by negating the value at the corresponding index
    nums[index] = -nums[index];
  }

  // Return the result
  return result;
}
// @lc code=end
