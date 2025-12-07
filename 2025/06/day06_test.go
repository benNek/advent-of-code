package day06

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`

func TestPart1_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 4277556)
}

func TestPart1_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 3525371263915)
}

func TestPart2_Example(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example)
	aoc.ValidateTest(t, got, 3263827)
}

func TestPart2_RealInput(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 6846480843636)
}
