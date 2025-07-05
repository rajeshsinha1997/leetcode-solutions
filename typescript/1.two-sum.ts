/*
 * @lc app=leetcode id=1 lang=typescript
 *
 * [1] Two Sum
 */

// @lc code=start
function twoSum(nums: number[], target: number): number[] {
  // create an index store object to store the numbers and their indices
  const indexStore: Record<number, number> = {};

  // iterate through the given array of numbers
  for (let i = 0; i < nums.length; i++) {
    // calculate the complement of the current number
    const complement = target - nums[i];

    // check if the complement exists in the index store
    // if it exists, we have found the two numbers that add up to the target
    if (indexStore[complement] !== undefined) {
      // return the indices of the two numbers
      // the index of the complement and the current index
      return [indexStore[complement], i];
    }

    // if not found, store the current number and its index in the index store
    // this allows us to check for the complement in future iterations
    indexStore[nums[i]] = i;
  }

  // if no solution is found, return an empty array
  return [];
}
// @lc code=end
