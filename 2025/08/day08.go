package day08

import (
	"aoc"
	"fmt"
	"maps"
	"slices"
	"sort"
	"strconv"
	"strings"
)

type Solver struct{}

type Pair struct {
	a, b Box
}

type Box struct {
	x int
	y int
	z int
}

func (Solver) Part1(input string) (int, error) {
	lines := strings.Split(input, "\n")

	boxes := make([]Box, len(lines))
	for i, line := range lines {
		value := strings.Split(line, ",")
		x, _ := strconv.Atoi(value[0])
		y, _ := strconv.Atoi(value[1])
		z, _ := strconv.Atoi(value[2])
		boxes[i] = Box{x, y, z}
	}
	pairs := generatePairs(boxes)
	sort.Slice(pairs, func(i, j int) bool {
		return euclideanDistance(pairs[i].a, pairs[i].b) < euclideanDistance(pairs[j].a, pairs[j].b)
	})

	rep := map[Box]Box{}
	sizes := map[Box]int{}
	for _, box := range boxes {
		rep[box] = box
		sizes[box] = 1
	}

	//limit := 10   // exercise
	limit := 1000 // real input
	for i := 0; i < limit; i++ {
		pair := pairs[i]
		box1 := pair.a
		box2 := pair.b

		combine(rep, sizes, box1, box2)
	}

	top := 3
	ans := 1
	sortedValues := slices.Sorted(maps.Values(sizes))
	slices.Reverse(sortedValues)
	fmt.Println(sortedValues)
	for i := 0; i < top; i++ {
		ans *= sortedValues[i]
	}

	return ans, nil
}

func (Solver) Part2(input string) (int, error) {
	lines := strings.Split(input, "\n")

	boxes := make([]Box, len(lines))
	for i, line := range lines {
		value := strings.Split(line, ",")
		x, _ := strconv.Atoi(value[0])
		y, _ := strconv.Atoi(value[1])
		z, _ := strconv.Atoi(value[2])
		boxes[i] = Box{x, y, z}
	}
	pairs := generatePairs(boxes)
	sort.Slice(pairs, func(i, j int) bool {
		return euclideanDistance(pairs[i].a, pairs[i].b) < euclideanDistance(pairs[j].a, pairs[j].b)
	})

	rep := map[Box]Box{}
	sizes := map[Box]int{}
	for _, box := range boxes {
		rep[box] = box
		sizes[box] = 1
	}

	lastX1 := 0
	lastX2 := 0
	for i := 0; !isFullyConnected(sizes); i++ {
		pair := pairs[i]
		box1 := pair.a
		box2 := pair.b
		lastX1 = box1.x
		lastX2 = box2.x

		combine(rep, sizes, box1, box2)
	}

	return lastX2 * lastX1, nil
}

func generatePairs(boxes []Box) []Pair {
	var pairs []Pair
	for i := 0; i < len(boxes); i++ {
		for j := i + 1; j < len(boxes); j++ {
			pairs = append(pairs, Pair{boxes[i], boxes[j]})
		}
	}
	return pairs
}

func euclideanDistance(a, b Box) int {
	return aoc.Pow(a.x-b.x, 2) + aoc.Pow(a.y-b.y, 2) + aoc.Pow(a.z-b.z, 2)
}

func find(rep map[Box]Box, box Box) Box {
	if box == rep[box] {
		return box
	}

	return find(rep, rep[box])
}

func combine(rep map[Box]Box, sizes map[Box]int, box1 Box, box2 Box) {
	box1 = find(rep, box1)
	box2 = find(rep, box2)

	if box1 == box2 {
		return
	}

	if sizes[box1] >= sizes[box2] {
		rep[box2] = box1
		sizes[box1] += sizes[box2]
		sizes[box2] = 0
	} else {
		rep[box1] = box2
		sizes[box2] += sizes[box1]
		sizes[box1] = 0
	}
}

func isFullyConnected(sizes map[Box]int) bool {
	moreThanZero := 0
	for _, size := range sizes {
		if size > 0 {
			moreThanZero++
		}

		if moreThanZero > 1 {
			return false
		}
	}
	return moreThanZero == 1
}
