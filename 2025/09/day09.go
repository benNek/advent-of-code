package day09

import (
	"aoc"
	"strconv"
	"strings"
)

type Solver struct{}

type Point struct {
	x, y int
}

func (Solver) Part1(input string) (int, error) {
	lines := strings.Split(input, "\n")
	points := make([]Point, len(lines))
	for i, line := range lines {
		inputs := strings.Split(line, ",")
		x, _ := strconv.Atoi(inputs[0])
		y, _ := strconv.Atoi(inputs[1])
		points[i] = Point{x, y}
	}

	maxArea := 0
	for i := 0; i < len(points); i++ {
		for j := i + 1; j < len(points); j++ {
			maxArea = aoc.Max(maxArea, area(points[i], points[j]))
		}
	}

	return maxArea, nil
}

func (Solver) Part2(input string) (int, error) {
	lines := strings.Split(input, "\n")
	points := make([]Point, len(lines))
	for i, line := range lines {
		inputs := strings.Split(line, ",")
		x, _ := strconv.Atoi(inputs[0])
		y, _ := strconv.Atoi(inputs[1])
		points[i] = Point{x, y}
	}

	maxArea := 0
	for i := 0; i < len(points); i++ {
		for j := i + 1; j < len(points); j++ {
			if isInside(points[i], points[j], points) {
				maxArea = aoc.Max(maxArea, area(points[i], points[j]))
			}
		}
	}
	return maxArea, nil
}

func area(a, b Point) int {
	x1 := aoc.Min(a.x, b.x)
	x2 := aoc.Max(a.x, b.x)
	y1 := aoc.Min(a.y, b.y)
	y2 := aoc.Max(a.y, b.y)

	return (x2 - x1 + 1) * (y2 - y1 + 1)
}

func isInside(a, b Point, polygon []Point) bool {
	xMin, xMax := aoc.Min(a.x, b.x), aoc.Max(a.x, b.x)
	yMin, yMax := aoc.Min(a.y, b.y), aoc.Max(a.y, b.y)
	for i := range polygon {
		currPol := polygon[i]
		nextPol := polygon[(i+1)%len(polygon)]

		x1, y1 := currPol.x, currPol.y
		x2, y2 := nextPol.x, nextPol.y

		if y1 == y2 {
			if yMin < y1 && y1 < yMax && (aoc.Min(x1, x2) <= xMin && xMin < aoc.Max(x1, x2) || aoc.Min(x1, x2) < xMax && xMax <= aoc.Max(x1, x2)) {
				return false
			}
		} else if x1 == x2 {
			if xMin < x1 && x1 < xMax && (aoc.Min(y1, y2) <= yMin && yMin < aoc.Max(y1, y2) || aoc.Min(y1, y2) < yMax && yMax <= aoc.Max(y1, y2)) {
				return false
			}
		}
	}
	return true
}
