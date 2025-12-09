package day09

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

func TestPart1_ExampleInput(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 50)
}

func TestPart1_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 4715966250)
}

func TestPart2_ExampleInput(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 24)
}

func TestPart2_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 1530527040)
}
