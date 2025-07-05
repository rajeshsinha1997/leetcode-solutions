/*
 * @lc app=leetcode id=695 lang=typescript
 *
 * [695] Max Area of Island
 */

// @lc code=start
function maxAreaOfIsland(grid: number[][]): number {
  // declare a variable to keep track of the maximum area
  let maxArea = 0;

  // iterate through each row of the grid
  for (let row = 0; row < grid.length; row++) {
    // iterate through each column of the grid
    for (let col = 0; col < grid[row].length; col++) {
      // check if the current cell is part of an island (1)
      if (grid[row][col] === 1) {
        // find the area of the island starting from the current cell
        // and update the maximum area if the current area is larger
        maxArea = Math.max(maxArea, dfs(row, col, grid));
      }
    }
  }

  // return the max area of the island
  return maxArea;
}

/**
 * Depth-first search to explore the island and calculate its area.
 * @param currentRow - The current row index.
 * @param currentColumn - The current column index.
 * @param grid - The grid representing the map.
 * @returns The total area of the island.
 */
function dfs(
  currentRow: number,
  currentColumn: number,
  grid: number[][]
): number {
  // check if the current cell is within bounds and is part of an island (1)
  if (
    currentRow >= 0 &&
    currentRow < grid.length &&
    currentColumn >= 0 &&
    currentColumn < grid[0].length &&
    grid[currentRow][currentColumn] === 1
  ) {
    // mark the current cell as visited by setting it to 0
    grid[currentRow][currentColumn] = 0;

    // initialize the area of the current island
    let currentArea = 1;

    // recursively explore all four directions (up, down, left, right)
    // and add their areas to the current area
    currentArea += dfs(currentRow - 1, currentColumn, grid);
    currentArea += dfs(currentRow + 1, currentColumn, grid);
    currentArea += dfs(currentRow, currentColumn - 1, grid);
    currentArea += dfs(currentRow, currentColumn + 1, grid);

    // return the total area of the island found from the current cell
    return currentArea;
  }

  // if the current cell is out of bounds or not part of an island, return 0
  return 0;
}
// @lc code=end
