package day02

import (
	"fmt"
	"strconv"
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
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
	return ans, nil
}

func (Solver) Part2(input string) (int, error) {
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
	return ans, nil
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
