// pradinis 1/3 arba 3/1 is viso 10
// dominos:
// 3 1
// 4 6
// 5 1
// 6 6
// 3 5
// 1 2
// 2 4
// 3 4
// 2 3
// 2 6

type Domino = {
  first: number;
  second: number;
};

const dominoes: Domino[] = [
  { first: 3, second: 1 },
  { first: 4, second: 6 },
  { first: 5, second: 1 },
  { first: 6, second: 6 },
  { first: 3, second: 5 },
  { first: 1, second: 2 },
  { first: 2, second: 4 },
  { first: 3, second: 4 },
  { first: 2, second: 3 },
  { first: 2, second: 6 },
];

const target = 10;

function key(domino: Domino) {
  return (
    Math.min(domino.first, domino.second).toString() +
    Math.max(domino.first, domino.second).toString()
  );
}

function retrieveVisitableDominoes(start: number, visited: string[]) {
  return dominoes
    .filter((domino) => !visited.includes(key(domino)))
    .filter((domino) => domino.first === start || domino.second === start)
    .map((domino) =>
      domino.first === start
        ? domino
        : { first: domino.second, second: domino.first }
    );
}

function traverse(current: Domino, visited: string[]) {
  console.log("CUrrently on ", current, visited);
  if (visited.length === target) {
    console.log("FOUND");
    console.log(visited);
    return;
  }

  const newVisited = [...visited, key(current)];
  const paths = retrieveVisitableDominoes(current.second, newVisited);

  console.log("possible dominos", paths);
  for (const domino of paths) {
    return traverse(domino, newVisited);
  }
}

traverse(dominoes[0], []);
// traverse({ first: 1, second: 3 }, []);
