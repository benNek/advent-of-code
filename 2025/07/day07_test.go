package day07

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`

func TestPart1_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 21)
}

func TestPart1_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 1533)
}

func TestPart2_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 40)
}

func TestPart2_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 10733529153890)
}
