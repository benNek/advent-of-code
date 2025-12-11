package day11

import (
	"strings"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	lines := strings.Split(input, "\n")
	graph := map[string][]string{}
	for _, line := range lines {
		parts := strings.Split(line, ": ")
		from, to := parts[0], parts[1]
		graph[from] = strings.Split(to, " ")
	}

	ans := dfs(graph, "you", "out")

	return ans, nil
}

func dfs(graph map[string][]string, node string, target string) int {
	if node == target {
		return 1
	}

	count := 0
	for _, neighbor := range graph[node] {
		count += dfs(graph, neighbor, target)
	}

	return count
}

type state struct {
	node    string
	seenDac bool
	seenFft bool
}

func (Solver) Part2(input string) (int, error) {
	lines := strings.Split(input, "\n")
	graph := map[string][]string{}
	for _, line := range lines {
		parts := strings.Split(line, ": ")
		from, to := parts[0], parts[1]
		graph[from] = strings.Split(to, " ")
	}

	memo := map[state]int{}
	ans := backtrack(graph, "svr", "out", false, false, memo)

	return ans, nil
}

func backtrack(graph map[string][]string, node string, target string, seenDac bool, seenFft bool, memo map[state]int) int {
	if node == "dac" {
		seenDac = true
	}
	if node == "fft" {
		seenFft = true
	}

	if node == target {
		if seenDac && seenFft {
			return 1
		}
		return 0
	}

	st := state{node, seenDac, seenFft}
	if v, ok := memo[st]; ok {
		return v
	}

	count := 0
	for _, neighbor := range graph[node] {
		count += backtrack(graph, neighbor, target, seenDac, seenFft, memo)
	}

	memo[st] = count
	return count
}
