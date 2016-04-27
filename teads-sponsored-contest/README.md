# The Teads Sponsored Contest

[This puzzle](https://www.codingame.com/games/puzzles?puzzleId=51) was tough and marks the first time I've encountered graph theory. The challenge is to find the smallest amount of steps to traverse a graph.

I had to get some hints from [the forums](https://www.codingame.com/forum/t/teads-tv/415), and there I learned about a technique called the Demukron Algorithm. It took me a few days to fully understand it, but the idea is you can cycle through the graph and remove nodes with only one neighbor. Each is cycle is considered a 'turn' and will yeild a new crop of 'leaves' for the next cycle. Once all the nodes have been removed, count up the steps and you have your solution.