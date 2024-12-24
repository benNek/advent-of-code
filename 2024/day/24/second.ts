import getLines from "../../../helpers/readFile.ts";

const EXPRESSION_REGEX = /(.+) (AND|OR|XOR) (.+) -> (.+)/;

const lines = await getLines();

let mermaid = "flowchart TB\n";
for (const line of lines) {
    if (EXPRESSION_REGEX.test(line)) {
        const match = EXPRESSION_REGEX.exec(line);
        const [lhs, op, rhs, key] = match!.slice(1, 5);

        const conc = `${lhs}${rhs}${op}(${op}):::${op}`;
        mermaid += `${lhs} & ${rhs} --> ${conc} ----> ${key}\n`;
    }
}
mermaid += "classDef XOR fill:#eb2d86\n";
mermaid += "classDef AND fill:#47eb2d\n";
mermaid += "classDef OR fill:#f96\n";

console.clear();
const html = "<html><script type=\"module\">\n" +
    "  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';\n" +
    "  mermaid.initialize({ startOnLoad: true, maxEdges: 2000, flowchart: { useMaxWidth: false }});\n" +
    "</script>\n" +
    "<body>\n" +
    "  Here is a mermaid diagram:\n" +
    "  <pre class=\"mermaid\">\n" +
    "        " + mermaid + "\n" +
    "  </pre>\n" +
    "</body></html>"
console.log(html)