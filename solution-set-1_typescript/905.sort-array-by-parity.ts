/*
 * @lc app=leetcode id=905 lang=typescript
 *
 * [905] Sort Array By Parity
 */

// @lc code=start
function sortArrayByParity(nums: number[]): number[] {
  // Create two different pointers one pointing to the start
  // and the other to the end
  let leftPointer = 0;
  let rightPointer = nums.length - 1;

  // Keep the pointers moving until they cross each other
  while (leftPointer < rightPointer) {
    // Increment the left pointer if the current element is even
    while (leftPointer < rightPointer && (nums[leftPointer] & 1) === 0) {
      leftPointer++;
    }

    // Decrement the right pointer if the current element is odd
    while (rightPointer > leftPointer && (nums[rightPointer] & 1) === 1) {
      rightPointer--;
    }

    // Swap the elements if the left pointer is less than the right pointer
    if (leftPointer < rightPointer) {
      [nums[leftPointer], nums[rightPointer]] = [
        nums[rightPointer],
        nums[leftPointer],
      ];
    }
  }

  // Return the sorted array
  return nums;
}
// @lc code=end
