package day03

import (
	"aoc"
	"testing"
)

var s = Solver{}

// Example inputs hardcoded in tests.
var example = `987654321111111
811111111111119
234234234234278
818181911112111`

func TestPart1_Example1(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 357)
}

func TestPart1_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 17301)
}

func TestPart2_Example2(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 3121910778619)
}

func TestPart2_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 172162399742349)
}
