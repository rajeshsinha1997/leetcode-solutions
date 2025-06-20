/*
 * @lc app=leetcode id=11 lang=typescript
 *
 * [11] Container With Most Water
 */

// @lc code=start
function maxArea(height: number[]): number {
  // create two pointers, one at the start and one at the end of the array
  let leftPointer = 0,
    rightPointer = height.length - 1;

  // create a variable to keep track of the maximum area
  let maxArea = 0;

  // loop until the left pointer is less than the right pointer
  while (leftPointer < rightPointer) {
    // calculate the current area between the two pointers and update maxArea if it's larger
    maxArea = Math.max(
      maxArea,
      (rightPointer - leftPointer) *
        Math.min(height[leftPointer], height[rightPointer])
    );

    // check if the height at the left pointer is less than the height at the right pointer
    if (height[leftPointer] < height[rightPointer]) {
      // if it is, move the left pointer to the right
      leftPointer++;
    }
    // if the height at the left pointer is greater than or equal to the height at the right pointer
    else {
      // move the right pointer to the left
      rightPointer--;
    }
  }

  // return the maximum area
  return maxArea;
}
// @lc code=end
