package day12

import (
	"strconv"
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	ans := 0

	parts := strings.Split(input, "\n\n")
	regions := strings.Split(parts[len(parts)-1], "\n")
	for _, region := range regions {
		fields := strings.Split(region, ": ")
		size := strings.Split(fields[0], "x")
		length, _ := strconv.Atoi(size[0])
		width, _ := strconv.Atoi(size[1])

		requirements := strings.Fields(fields[1])
		if fits(length, width, requirements) {
			ans++
		}
	}

	return ans, nil
}

func fits(length int, width int, requirements []string) bool {
	totalPresents := 0
	for _, requirement := range requirements {
		count, _ := strconv.Atoi(requirement)
		totalPresents += count
	}

	return totalPresents <= length/3*width/3
}

func (Solver) Part2(input string) (int, error) {
	return 0, nil
}
