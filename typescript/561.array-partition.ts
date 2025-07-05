/*
 * @lc app=leetcode id=561 lang=typescript
 *
 * [561] Array Partition
 */

// @lc code=start
function arrayPairSum(nums: number[]): number {
  // Sort the array in ascending order
  nums.sort((a, b) => a - b);

  // Initialize a variable to hold the sum of pairs
  let sum = 0;

  // Iterate through the array in steps of 2
  for (let ind = 0; ind < nums.length; ind += 2) {
    // Add the first element of each pair to the sum
    sum += nums[ind];
  }

  // Return the total sum of the first elements of each pair
  return sum;
}
// @lc code=end
