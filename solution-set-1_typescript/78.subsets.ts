/*
 * @lc app=leetcode id=78 lang=typescript
 *
 * [78] Subsets
 */

// @lc code=start
function subsets(nums: number[]): number[][] {
  // create a result array that will hold all subsets and add the empty set and the full set
  const result: number[][] = [[], [...nums]];

  // iterate through the nums array to create subsets
  for (let ind = 0; ind < nums.length; ind++) {
    // for each index, create an end point which indicates the end of the current subset
    // and iterate through the array from the current index to the end point
    let endPoint = ind;

    // loop until the end point reaches the length of the nums array
    while (endPoint < nums.length) {
      // create a collector array to hold the current subset
      let collector: number[] = [];

      // iterate through the array from the current index to the end point
      for (let jInd = ind; jInd <= endPoint; jInd++) {
        // push the current number into the collector array
        collector.push(nums[jInd]);
      }

      // push the collector array into the result array
      result.push(collector);

      // increment the end point to create the next subset
      endPoint++;
    }
  }

  // return the result array containing all subsets
  return result;
}
// @lc code=end
