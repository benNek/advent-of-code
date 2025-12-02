package main

import (
	_ "embed"
	"flag"
	"fmt"
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
	return zeroes
}

func part2(input string) int {
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
	return ans
}

func parseInput(input string) []string {
	return strings.Split(input, "\n")
}

func mod(a, b int) int {
	return (a%b + b) % b
}
