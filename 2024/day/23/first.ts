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

const parties = new Set<string>();
for (const name of Object.keys(nodes)) {
    const node = nodes[name]!;
    const neighbours = [...node.neighbours.values()];
    for (let i = 0; i < node.neighbours.size; i++) {
        for (let j = i + 1; j < node.neighbours.size; j++) {
            const result = isLanParty([node, neighbours[i], neighbours[j]]);
            if (result) {
                parties.add(result);
            }
        }
    }
}

console.log(parties.size)

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

function isLanParty(nodes: Node[]): string | null {
    if (!nodes.some(node => node.name.startsWith("t"))) {
        return null;
    }

    const sorted = nodes.sort((a, b) => a.name.localeCompare(b.name));

    if (sorted[0].neighbours.has(sorted[1].name) && sorted[0].neighbours.has(sorted[2].name) && sorted[1].neighbours.has(sorted[2].name)) {
        return `${sorted[0].name},${sorted[1].name},${sorted[2].name}`;
    }

    return null;
}