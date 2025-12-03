package main

import (
	_ "embed"
	"flag"
	"fmt"
	"math"
	"strconv"
	"strings"
)

//go:embed input.txt
var input string

func main() {
	var part int
	flag.IntVar(&part, "part", 1, "part 1 or 2")
	flag.Parse()
	fmt.Println("Running part", part)

	if part == 1 {
		part1(input)
	} else {
		part2(input)
	}
}

func part1(input string) int {
	ans := 0
	// greedy, find first max number and then we will have a huge choice of numbers on right side
	lines := strings.Split(input, "\n")
	for _, line := range lines {
		leftMax := 0
		leftIndex := 0
		for i := 0; i < len(line); i++ {
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

	return ans
}

func part2(input string) int64 {
	ans := int64(0)
	lines := strings.Split(input, "\n")
	for _, line := range lines {
		//fmt.Println(line)
		ans += traverse(line, 12, 0, 0)
	}

	return ans
}

func traverse(bank string, remaining int, startPoint int, currJol int) int64 {
	if remaining == 0 {
		//fmt.Println("result", currJol)
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
