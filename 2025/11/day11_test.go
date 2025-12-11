package day11

import (
	"aoc"
	"testing"
)

var s = Solver{}

var example = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`

func TestPart1_ExampleInput(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part1, example)
	aoc.ValidateTest(t, got, 5)
}

func TestPart1_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part1)
	aoc.ValidateTest(t, got, 724)
}

var example2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`

func TestPart2_ExampleInput(t *testing.T) {
	got := aoc.MustRunPartWithExample(t, s.Part2, example2)
	aoc.ValidateTest(t, got, 2)
}

func TestPart2_Input(t *testing.T) {
	got := aoc.MustRunPart(t, s.Part2)
	aoc.ValidateTest(t, got, 473930047491888)
}
