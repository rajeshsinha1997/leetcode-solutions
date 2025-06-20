/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // calculate the total number of elements in both arrays
  const totalNumberOfElements = nums1.length + nums2.length;

  // variable to check if total number of elements is even or odd
  const isEven = totalNumberOfElements % 2 === 0;

  // find the median index
  // for odd number of elements, it is the index of the middle element
  // for even number of elements, it is the index of the second middle element
  const medianIndex = Math.floor(totalNumberOfElements / 2);

  // create two pointers to traverse both arrays and another pointer to keep track of the current index in the merged array
  let fp = 0,
    sp = 0,
    mp = 0;

  // create two variables to store the current and previous values of the merged array
  let current = 0,
    previous = 0;

  // loop until we reach the median index
  while (mp <= medianIndex) {
    // store the current value of the merged array as the previous value
    previous = current;

    // if the first pointer is less than the length of the first array (which means there are still elements to consider in the first array) and either the second pointer is greater than or equal to the length of the second array (which means there are no elements left in the second array to consider) or the current element in the first array is less than or equal to the current element in the second array
    if (fp < nums1.length && (sp >= nums2.length || nums1[fp] <= nums2[sp])) {
      // set the current value to the current element in the first array and increment the first pointer
      current = nums1[fp++];
    }
    // otherwise, set the current value to the current element in the second array and increment the second pointer
    else {
      current = nums2[sp++];
    }

    // increment the merged array pointer
    mp++;
  }

  // if the total number of elements is even, return the average of the current and previous values, else return the current value
  return isEven ? (current + previous) / 2 : current;
}
// @lc code=end
