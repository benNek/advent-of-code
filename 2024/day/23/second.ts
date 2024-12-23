import getLines from "../../../helpers/readFile.ts";

type Node = {
    name: string;
    neighbours: Map<string, Node>;
}

const lines = await getLines();

const nodes: Record<string, Node> = {};
for (const line of lines) {
    const [leftName, rightName] = line.split("-");

    const left = getOrCreateNode(leftName);
    const right = getOrCreateNode(rightName);

    addNeighbor(left, right);
    addNeighbor(right, left);
}

const cliques: Node[][] = [];

// Initial call with empty R, all vertices in P, and empty X
bronKerbosch(
    new Set<Node>(),
    new Set(Object.values(nodes)),
    new Set<Node>(),
    cliques
);
const max = cliques.sort((a, b) => b.length - a.length)[0];
console.log(max.map(node => node.name).sort().join(","));

function bronKerbosch(r: Set<Node>,
    p: Set<Node>,
    x: Set<Node>,
    cliques: Node[][]) {
    if (p.size === 0 && x.size === 0) {
        cliques.push(Array.from(r));
        return;
    }

    for (const node of p) {
        const neighbours = node.neighbours;

        const newR = new Set(r);
        newR.add(node);

        const newP = new Set<Node>();
        for (const n of p) {
            if (neighbours.has(n.name)) {
                newP.add(n);
            }
        }

        const newX = new Set<Node>();
        for (const n of x) {
            if (neighbours.has(n.name)) {
                newX.add(n);
            }
        }

        bronKerbosch(newR, newP, newX, cliques);
        p.delete(node);
        x.add(node);
    }
}

function getOrCreateNode(name: string) {
    if (!nodes[name]) {
        nodes[name] = {
            name,
            neighbours: new Map()
        }
    }

    return nodes[name];
}

function addNeighbor(node: Node, neighbour: Node) {
    node.neighbours.set(neighbour.name, neighbour);
}