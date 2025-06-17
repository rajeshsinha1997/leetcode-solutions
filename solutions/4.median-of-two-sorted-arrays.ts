/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // create an array to hold the merged values
  const mergedArray: number[] = [];

  // declare two pointers for each array
  let ind1 = 0,
    ind2 = 0;

  // iterate through both arrays until one of them is fully traversed
  while (ind1 < nums1.length || ind2 < nums2.length) {
    // if first array is fully traversed, push the next element from the second array and increment its pointer
    if (ind1 === nums1.length) {
      mergedArray.push(nums2[ind2++]);
    }
    // if second array is fully traversed, push the next element from the first array and increment its pointer
    else if (ind2 === nums2.length) {
      mergedArray.push(nums1[ind1++]);
    }
    // if both arrays have elements left, compare the next elements and push the smaller one and increment the corresponding pointer
    else {
      mergedArray.push(
        nums1[ind1] < nums2[ind2] ? nums1[ind1++] : nums2[ind2++]
      );
    }
  }

  // check if the merged array has even or odd length
  if (mergedArray.length % 2 !== 0) {
    // if odd, return the middle element
    return mergedArray[Math.floor(mergedArray.length / 2)];
  } else {
    // if even, return the average of the two middle elements
    return (
      (mergedArray[Math.floor(mergedArray.length / 2)] +
        mergedArray[Math.floor(mergedArray.length / 2) - 1]) /
      2
    );
  }
}
// @lc code=end
