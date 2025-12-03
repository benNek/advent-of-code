package day01

import (
	"strconv"
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	zeroes := 0
	position := 50
	for _, line := range parseInput(input) {
		dir := line[:1]
		diff, err := strconv.Atoi(line[1:])
		if err != nil {
			panic(err)
		}

		if dir == "L" {
			position -= diff
		} else {
			position += diff
		}
		position = mod(position, 100)

		if position == 0 {
			zeroes++
		}
	}
	return zeroes, nil
}

func (Solver) Part2(input string) (int, error) {
	ans := 0
	position := 50
	// whooop learning how to put stuff in map in golang now
	dirStep := map[byte]int{
		'R': 1,
		'L': -1,
	}
	for _, line := range parseInput(input) {
		step, _ := dirStep[line[0]]
		diff, _ := strconv.Atoi(line[1:])
		for range diff {
			position += step
			if position%100 == 0 {
				ans++
			}
		}
	}
	return ans, nil
}

func parseInput(input string) []string {
	return strings.Split(input, "\n")
}

func mod(a, b int) int {
	return (a%b + b) % b
}
