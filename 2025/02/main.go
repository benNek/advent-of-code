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
	ans := 0
	combos := strings.Split(input, ",")
	for _, combo := range combos {
		split := strings.Split(combo, "-")
		from, _ := strconv.Atoi(split[0])
		to, _ := strconv.Atoi(split[1])

		for i := from; i <= to; i++ {
			if isInvalidId(strconv.Itoa(i)) {
				//fmt.Println(i, "is not a valid id")
				ans += i
			}
		}
	}
	return ans
}

func part2(input string) int {
	ans := 0
	combos := strings.Split(input, ",")
	for _, combo := range combos {
		split := strings.Split(combo, "-")
		from, _ := strconv.Atoi(split[0])
		to, _ := strconv.Atoi(split[1])

		for i := from; i <= to; i++ {
			if isInvalidIdPart2(strconv.Itoa(i)) {
				//fmt.Println(i, "is not a valid id")
				ans += i
			}
		}
	}
	return ans
}

func isInvalidId(id string) bool {
	// odd length numbers cannot be invalid
	if len(id)%2 != 0 {
		return false
	}

	// for even length, see if the patterns is repeated twice
	first := id[:len(id)/2]
	last := id[len(id)/2:]
	return first == last
}

func isInvalidIdPart2(id string) bool {
	for k := 1; k <= len(id)/2; k++ {
		repeatingPart := id[:k]
		invalid := true
		for i := k; i+k <= len(id); i += k {
			part := id[i : i+k]
			if part != repeatingPart {
				invalid = false
				break
			}
		}
		// last part only if we didnt check it as part of the array
		if len(id)%k != 0 && id[len(id)-k+1:] != repeatingPart {
			invalid = false
		}

		if invalid {
			fmt.Println("Invalid", id, " on k", k)
			return true
		}
	}

	return false
}
