/*
 * @lc app=leetcode id=4 lang=typescript
 *
 * [4] Median of Two Sorted Arrays
 */

// @lc code=start
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  // if nums1 is longer than nums2, swap them
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  // find the total number of elements in both arrays
  const totalNumberOfElements = nums1.length + nums2.length;

  // variable to check if total number of elements is even or odd
  const isEven = totalNumberOfElements % 2 === 0;

  // calculate the total number of elements in the left half
  let elementsInLeftHalf = Math.floor((totalNumberOfElements + 1) / 2);

  // find the minimum and maximum number of elements from the first array that can be in the left half
  let minElementsFromFirstArrayInLeftHalf = 0;
  let maxElementsFromFirstArrayInLeftHalf = nums1.length;

  // variables to store the left maximum and right minimum values from both arrays
  // these will be used to find the median
  let leftMaxFromFirstArray = 0;
  let rightMinFromFirstArray = 0;
  let leftMaxFromSecondArray = 0;
  let rightMinFromSecondArray = 0;

  // binary search to find the partition point
  while (
    minElementsFromFirstArrayInLeftHalf <= maxElementsFromFirstArrayInLeftHalf
  ) {
    // find how many elements to take from the first array
    const numberOfElementsToTakeFromFirstArray = Math.floor(
      (minElementsFromFirstArrayInLeftHalf +
        maxElementsFromFirstArrayInLeftHalf) /
        2
    );

    // find how many elements to take from the second array
    const numberOfElementsToTakeFromSecondArray =
      elementsInLeftHalf - numberOfElementsToTakeFromFirstArray;

    // find the left maximum and right minimum values from first array
    leftMaxFromFirstArray =
      numberOfElementsToTakeFromFirstArray > 0
        ? nums1[numberOfElementsToTakeFromFirstArray - 1]
        : -Infinity;
    rightMinFromFirstArray =
      numberOfElementsToTakeFromFirstArray < nums1.length
        ? nums1[numberOfElementsToTakeFromFirstArray]
        : Infinity;

    // find the left maximum and right minimum values from second array
    leftMaxFromSecondArray =
      numberOfElementsToTakeFromSecondArray > 0
        ? nums2[numberOfElementsToTakeFromSecondArray - 1]
        : -Infinity;
    rightMinFromSecondArray =
      numberOfElementsToTakeFromSecondArray < nums2.length
        ? nums2[numberOfElementsToTakeFromSecondArray]
        : Infinity;

    // check if we have found the correct partition
    if (
      leftMaxFromFirstArray <= rightMinFromSecondArray &&
      leftMaxFromSecondArray <= rightMinFromFirstArray
    ) {
      // if we have found the correct partition, break the loop
      break;
    }
    // if the left maximum from first array is greater than the right minimum from second array,
    // it means we need to take fewer elements from the first array
    if (leftMaxFromFirstArray > rightMinFromSecondArray) {
      maxElementsFromFirstArrayInLeftHalf =
        numberOfElementsToTakeFromFirstArray - 1;
    }
    // if the left maximum from second array is greater than the right minimum from first array,
    // it means we need to take more elements from the first array
    else {
      minElementsFromFirstArrayInLeftHalf =
        numberOfElementsToTakeFromFirstArray + 1;
    }
  }

  // if total number of elements is even, return the average of the two middle elements.
  // if total number of elements is odd, return the maximum of the left half
  return isEven
    ? (Math.max(leftMaxFromFirstArray, leftMaxFromSecondArray) +
        Math.min(rightMinFromFirstArray, rightMinFromSecondArray)) /
        2
    : Math.max(leftMaxFromFirstArray, leftMaxFromSecondArray);
}
// @lc code=end
