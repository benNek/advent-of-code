package day04

import (
	"aoc"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	ans := 0
	grid := aoc.ParseGrid(input)
	for y, row := range grid {
		for x := range row {
			if string(grid[y][x]) != "@" {
				continue
			}
			adjacent := getAdjacent(grid, x, y)
			if adjacent < 4 {
				ans++
			}
		}
	}

	return ans, nil
}

func (Solver) Part2(input string) (int, error) {
	ans := 0
	currIt := 1

	grid := aoc.ParseGrid(input)
	for currIt > 0 {
		currIt = 0
		for y, row := range grid {
			for x := range row {
				if string(grid[y][x]) != "@" {
					continue
				}

				adjacent := getAdjacent(grid, x, y)
				if adjacent < 4 {
					grid[y][x] = 'x'
					currIt++
					ans++
				}
			}
		}
	}

	return ans, nil
}

var dirs = [8][2]int{
	{-1, -1}, {-1, 0}, {-1, 1},
	{0, -1}, {0, 1},
	{1, -1}, {1, 0}, {1, 1},
}

func getAdjacent(grid [][]byte, x int, y int) int {
	adj := 0
	for _, dir := range dirs {
		nx := x + dir[1]
		ny := y + dir[0]

		if nx >= 0 && nx < len(grid) && ny >= 0 && ny < len(grid) {
			if grid[ny][nx] == '@' {
				adj++
			}
		}
	}
	return adj
}
