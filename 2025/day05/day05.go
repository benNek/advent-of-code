package day05

import (
	"aoc"
	"fmt"
	"sort"
	"strconv"
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	ans := 0
	lines := strings.Split(input, "\n")
	var ranges [][]int

	rangesPart := true
	for _, line := range lines {
		if line == "" {
			rangesPart = false
			sort.Slice(ranges, func(i, j int) bool {
				return ranges[i][1] < ranges[j][1]
			})
			fmt.Println("reaching empty", ranges)
			continue
		}

		if rangesPart {
			currRange := strings.Split(line, "-")
			from, _ := strconv.Atoi(currRange[0])
			to, _ := strconv.Atoi(currRange[1])

			ranges = append(ranges, []int{from, to})
		} else {
			value, _ := strconv.Atoi(line)
			if isFreshIngredient(ranges, value) {
				ans++
			}
		}
	}

	return ans, nil
}

func isFreshIngredient(ranges [][]int, value int) bool {
	for i := 0; i < len(ranges); i++ {
		if ranges[i][0] <= value && value <= ranges[i][1] {
			return true
		}
	}

	return false
}

func (Solver) Part2(input string) (int64, error) {
	ans := int64(0)
	lines := strings.Split(input, "\n")
	var ranges [][]int64

	for _, line := range lines {
		if line == "" {
			break
		}

		currRange := strings.Split(line, "-")
		from, _ := strconv.ParseInt(currRange[0], 10, 64)
		to, _ := strconv.ParseInt(currRange[1], 10, 64)

		ranges = append(ranges, []int64{from, to})
	}

	sort.Slice(ranges, func(i, j int) bool {
		return ranges[i][0] < ranges[j][0]
	})

	merged := make([][]int64, 0)
	for _, interval := range ranges {
		if len(merged) == 0 {
			merged = append(merged, interval)
			continue
		}

		lastMerged := merged[len(merged)-1]
		if lastMerged[1] < interval[0] {
			merged = append(merged, interval)
		} else {
			merged[len(merged)-1][1] = aoc.Max(lastMerged[1], interval[1])
		}
	}

	for _, interval := range merged {
		ans += interval[1] - interval[0] + 1
	}

	fmt.Println(merged)

	return ans, nil
}
