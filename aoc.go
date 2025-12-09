package aoc

import (
	"cmp"
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"
)

type Solver[T any] interface {
	Part1(input string) (T, error)
	Part2(input string) (T, error)
}

func MustRunPartWithExample[T any](t *testing.T, part func(string) (T, error), input string) T {
	t.Helper()
	t0 := time.Now()
	res, err := part(input)
	fmt.Println("--- AOC --- Execution took", time.Since(t0))
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	return res
}

func MustRunPart[T any](t *testing.T, part func(string) (T, error)) T {
	t.Helper()
	t0 := time.Now()
	input := MustLoadInput(t, "input.txt")
	fmt.Println("--- AOC --- Input parse time", time.Since(t0))
	return MustRunPartWithExample(t, part, input)
}

func MustLoadInput(t *testing.T, name string) string {
	t.Helper()

	_, file, _, ok := runtime.Caller(2)
	if !ok {
		t.Fatalf("cannot determine caller")
	}

	path := filepath.Join(filepath.Dir(file), name)
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("cannot read %s: %v", path, err)
	}
	return string(data)
}

func ValidateTest[T comparable](t *testing.T, got T, want T) {
	t.Helper()
	if got != want {
		t.Fatalf("want %v, got %v", want, got)
	}
}

func ParseGrid(input string) [][]byte {
	lines := strings.Split(strings.TrimSpace(input), "\n")
	grid := make([][]byte, len(lines))
	for i, line := range lines {
		grid[i] = []byte(line)
	}

	return grid
}

func PrintGrid(grid [][]byte) {
	for _, line := range grid {
		fmt.Println(string(line))
	}
}

func Max[T cmp.Ordered](a, b T) T {
	// because ofc golang only has max() for floats xD
	if a > b {
		return a
	}
	return b
}

func Min[T cmp.Ordered](a, b T) T {
	if a < b {
		return a
	}
	return b
}

func Pow(a int, n int) int {
	result := 1
	for i := 0; i < n; i++ {
		result *= a
	}

	return result
}
