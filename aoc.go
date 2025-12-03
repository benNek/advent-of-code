package aoc

import (
	"os"
	"path/filepath"
	"runtime"
	"testing"
)

type Solver[T any] interface {
	Part1(input string) (T, error)
	Part2(input string) (T, error)
}

func MustRunPart[T any](t *testing.T, part func(string) (T, error), input string) T {
	t.Helper()
	res, err := part(input)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	return res
}

func MustRunPartWithFile[T any](t *testing.T, part func(string) (T, error)) T {
	t.Helper()
	input := MustLoadInput(t, "input.txt")
	return MustRunPart(t, part, input)
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
