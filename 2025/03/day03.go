package day03

import (
	"math"
	"strconv"
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	ans := 0
	// greedy, find first max number and then we will have a huge choice of numbers on right side
	lines := strings.Split(input, "\n")
	for _, line := range lines {
		leftMax := 0
		leftIndex := 0
		for i := 0; i < len(line)-1; i++ {
			value, _ := strconv.Atoi(string(line[i]))
			if value > leftMax {
				leftMax = value
				leftIndex = i
			}
		}

		rightMax := 0
		for i := leftIndex + 1; i < len(line); i++ {
			value, _ := strconv.Atoi(string(line[i]))
			if value > rightMax {
				rightMax = value
			}
		}
		ans += leftMax*10 + rightMax
	}

	return ans, nil
}

func (Solver) Part2(input string) (int64, error) {
	ans := int64(0)
	lines := strings.Split(input, "\n")
	for _, line := range lines {
		ans += traverse(line, 12, 0, 0)
	}

	return ans, nil
}

func traverse(bank string, remaining int, startPoint int, currJol int) int64 {
	if remaining == 0 {
		return int64(currJol)
	}

	maxVal := 0
	maxIndex := 0
	for i := startPoint; i <= len(bank)-remaining; i++ {
		value, _ := strconv.Atoi(string(bank[i]))
		if value > maxVal {
			maxVal = value
			maxIndex = i
		}
	}

	return traverse(bank, remaining-1, maxIndex+1, currJol+int(math.Pow(10, float64(remaining-1)))*maxVal)
}
