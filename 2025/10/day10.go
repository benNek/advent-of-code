package day10

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/emirpasic/gods/queues/arrayqueue"
)

type Solver struct{}

func (Solver) Part1(input string) (int, error) {
	ans := 0
	lines := strings.Split(input, "\n")
	for _, line := range lines {
		var diagram []byte
		var wiring [][]int
		fields := strings.Fields(line)
		for _, field := range fields {
			if field[0] == '[' {
				diagram = parseDiagram(field)
			} else if field[0] == '(' {
				wiring = append(wiring, parseWiring(field))
			}
		}

		ans += minimumSteps(diagram, wiring)
	}

	return ans, nil
}

func (Solver) Part2(input string) (int, error) {

	return 0, nil
}

func parseDiagram(input string) []byte {
	return []byte(input[1 : len(input)-1])
}

func parseWiring(input string) []int {
	numbers := strings.Split(input[1:len(input)-1], ",")
	wiring := make([]int, len(numbers))
	for i, number := range numbers {
		wiring[i], _ = strconv.Atoi(number)
	}

	return wiring
}

func minimumSteps(diagram []byte, wirings [][]int) int {
	queue := arrayqueue.New()
	initial := make([]byte, len(diagram))
	for i := 0; i < len(diagram); i++ {
		initial[i] = byte('.')
	}

	steps := map[string]int{}
	steps[string(initial)] = 0

	queue.Enqueue(initial)
	for !queue.Empty() {
		st, _ := queue.Dequeue()
		if string(st.([]byte)) == string(diagram) {
			fmt.Println("returning ", steps[string(st.([]byte))])
			return steps[string(st.([]byte))]
		}
		state := st.([]byte)

		for _, wiring := range wirings {
			newState := make([]byte, len(state))
			copy(newState, state)
			for _, button := range wiring {
				if newState[button] == '#' {
					newState[button] = '.'
				} else {
					newState[button] = '#'
				}
			}

			_, ok := steps[string(newState)]
			if !ok {
				step, _ := steps[string(state)]
				steps[string(newState)] = step + 1
				queue.Enqueue(newState)
			}
		}
	}
	return 0
}
