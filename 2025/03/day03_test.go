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
	got := aoc.MustRunPart(t, s.Part1, example)
	want := 357
	if got != want {
		t.Fatalf("want %v, got %v", want, got)
	}
}

func TestPart1_RealInput(t *testing.T) {
	got := aoc.MustRunPartWithFile(t, s.Part1)
	want := 17301
	if got != want {
		t.Fatalf("want %v, got %v", want, got)
	}
}

func TestPart2_Example2(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2, example)
	want := int64(3121910778619)
	if got != want {
		t.Fatalf("want %v, got %v", want, got)
	}
}

func TestPart2_RealInput(t *testing.T) {
	got := aoc.MustRunPartWithFile(t, s.Part2)
	want := int64(172162399742349)
	if got != want {
		t.Fatalf("want %v, got %v", want, got)
	}
}
