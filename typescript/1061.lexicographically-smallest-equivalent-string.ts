/*
 * @lc app=leetcode id=1061 lang=typescript
 *
 * [1061] Lexicographically Smallest Equivalent String
 */

// @lc code=start
function smallestEquivalentString(
  s1: string,
  s2: string,
  baseStr: string
): string {
  // create a map to hold the equivalent characters
  const indexMap: Record<string, number> = {};

  // iterate through the base string and find the smallest equivalent character
  for (let ind = 0; ind < s1.length; ind++) {
    // get the character from the first and second strings
    let char1 = s1[ind];
    let char2 = s2[ind];

    // compare the characters from both strings along with their equivalents
    // present in the indexMap (if any) and find the smallest one
    const minChar = Math.min(
      indexMap[char1] ? indexMap[char1] : char1.charCodeAt(0),
      indexMap[char2] ? indexMap[char2] : char2.charCodeAt(0)
    );

    // check if there is an equivalent character already present in the indexMap for the first character
    if (indexMap[char1]) {
      // if there is, update all characters in the indexMap that are equivalent to char1
      // to the smallest character found
      const previousMinChar = indexMap[char1];
      for (const key in indexMap) {
        if (indexMap[key] === previousMinChar) {
          indexMap[key] = minChar;
        }
      }
    }
    // if there is no equivalent character for char1, add it to the indexMap
    // with the smallest character found
    else {
      indexMap[char1] = minChar;
    }

    // check if there is an equivalent character already present in the indexMap for the second character
    if (indexMap[char2]) {
      // if there is, update all characters in the indexMap that are equivalent to char2
      // to the smallest character found
      const previousMinChar = indexMap[char2];
      for (const key in indexMap) {
        if (indexMap[key] === previousMinChar) {
          indexMap[key] = minChar;
        }
      }
    }
    // if there is no equivalent character for char2, add it to the indexMap
    // with the smallest character found
    else {
      indexMap[char2] = minChar;
    }
  }

  // return the smallest equivalent string as result
  return baseStr
    .split("")
    .map((char) =>
      indexMap[char] ? String.fromCharCode(indexMap[char]) : char
    )
    .join("");
}
// @lc code=end
