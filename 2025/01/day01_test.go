package day01

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

func TestPart1_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 3)
}

func TestPart1_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 1158)
}

func TestPart2_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 6)
}

func TestPart2_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 6860)
}
