package day04

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.
`

func TestPart1_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 13)
}

func TestPart1_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 1349)
}

func TestPart2_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 43)
}

func TestPart2_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 8277)
}
