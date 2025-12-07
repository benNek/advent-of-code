package day07

import (
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	ans := 0
	lines := strings.Split(input, "\n")
	startCol := getStartingColumn(lines[0])

	beamCols := map[int]bool{startCol: true}
	for row := 1; row < len(lines); row++ {
		fresh := map[int]bool{}
		for col := range beamCols {
			if lines[row][col] == '^' {
				ans++
				fresh[col-1] = true
				fresh[col+1] = true
			} else {
				fresh[col] = true
			}
		}

		beamCols = fresh
	}

	return ans, nil
}

func (Solver) Part2(input string) (int, error) {
	ans := 0
	lines := strings.Split(input, "\n")
	startCol := getStartingColumn(lines[0])

	beams := map[int]int{startCol: 1}
	for row := 1; row < len(lines); row++ {
		fresh := map[int]int{}
		for col, cnt := range beams {
			if lines[row][col] == '^' {
				fresh[col-1] = fresh[col-1] + cnt
				fresh[col+1] = fresh[col+1] + cnt
			} else {
				fresh[col] = fresh[col] + cnt
			}
		}

		beams = fresh
	}

	for _, cnt := range beams {
		ans += cnt
	}
	return ans, nil
}

func getStartingColumn(line string) int {
	for i := 0; i < len(line); i++ {
		if line[i] == 'S' {
			return i
		}
	}
	return -1
}
