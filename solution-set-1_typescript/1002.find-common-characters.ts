/*
 * @lc app=leetcode id=1002 lang=typescript
 *
 * [1002] Find Common Characters
 */

// @lc code=start
function commonChars(words: string[]): string[] {
  // create an array to store the common characters
  const result: string[] = [];

  // create an array to store the frequency of each character
  const frequency: number[] = new Array(26).fill(Infinity);

  // iterate through each word in the input array
  for (const word of words) {
    // create a temporary frequency array for the current word
    const tempFrequency: number[] = new Array(26).fill(0);

    // iterate through each character in the word
    for (const char of word) {
      // increment the frequency of the character in the temporary array
      tempFrequency[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    // update the frequency array with the minimum frequency of each character
    // between the current minimum frequency and the temporary frequency
    for (let ind = 0; ind < 26; ind++) {
      frequency[ind] = Math.min(frequency[ind], tempFrequency[ind]);
    }
  }

  for (let ind = 0; ind < 26; ind++) {
    if (frequency[ind] > 0) {
      // add the character to the result array based on its frequency
      result.push(
        ...String.fromCharCode(ind + "a".charCodeAt(0)).repeat(frequency[ind])
      );
    }
  }

  // return the array containing the common characters
  return result;
}
// @lc code=end
