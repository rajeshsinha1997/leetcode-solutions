/*
 * @lc app=leetcode id=950 lang=typescript
 *
 * [950] Reveal Cards In Increasing Order
 */

// @lc code=start
function deckRevealedIncreasing(deck: number[]): number[] {
  // create a deque to simulate the process
  const deque: number[] = [];

  // get the sorted deck
  deck = deck.sort((a, b) => a - b);

  // iterate through the deck in reverse order
  for (let ind = deck.length - 1; ind >= 0; ind--) {
    // check if the deque has more than one element
    if (deque.length > 1) {
      // remove the last element and add it to the front
      deque.unshift(deque.pop()!);
    }

    // add the current card to the front of the deque
    deque.unshift(deck[ind]);
  }

  // return the deque as result
  return deque;
}
// @lc code=end
