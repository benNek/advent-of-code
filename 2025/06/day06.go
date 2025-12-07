package day06

import (
	"aoc"
	"strconv"
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	lines := strings.Split(input, "\n")
	operators := strings.Fields(lines[len(lines)-1])

	results := make([]int, len(operators))
	for i := range results {
		if operators[i] == "*" {
			results[i] = 1
		}
	}
	for i := 0; i < len(lines)-1; i++ {
		elements := strings.Fields(lines[i])

		for id, element := range elements {
			operator := operators[id]
			value, _ := strconv.Atoi(element)
			if operator == "*" {
				results[id] *= value
			} else if operator == "+" {
				results[id] += value
			}
		}

	}

	ans := 0
	for _, v := range results {
		ans += v
	}

	return ans, nil
}

func (Solver) Part2(input string) (int, error) {
	ans := 0
	lines := strings.Split(input, "\n")
	operators := strings.Fields(lines[len(lines)-1])
	width := 0
	for _, line := range lines {
		width = aoc.Max(width, len(line))
	}

	col := 0
	blockIdx := 0
	result := 0
	for col < width {
		operator := operators[blockIdx]
		if result == 0 && operator == "*" {
			result = 1
		}

		if isBlank(lines, col) {
			blockIdx++
			col++
			ans += result
			result = 0
			continue
		}

		num := 0
		for row := 0; row < len(lines)-1; row++ {
			if lines[row][col] == ' ' {
				continue
			}

			value, _ := strconv.Atoi(string(lines[row][col]))
			num = num*10 + value
		}

		if operator == "+" {
			result += num
		} else {
			result *= num
		}
		col++

		if col == width {
			ans += result
		}
	}

	return ans, nil

}

func isBlank(lines []string, col int) bool {
	for row := 0; row < len(lines)-1; row++ {
		if lines[row][col] != ' ' {
			return false
		}
	}
	return true
}
