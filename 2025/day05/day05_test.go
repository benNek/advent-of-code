package day05

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

func TestPart1_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 3)
}

func TestPart1_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 643)
}

func TestPart2_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 14)
}

func TestPart2_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 342018167474526)
}
