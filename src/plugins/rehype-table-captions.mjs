/**
 * Turn a captioned table into a numbered <figure>.
 *
 * A paragraph whose text begins with "Table:" that sits immediately before a
 * <table> supplies that table's caption:
 *
 *   Table: Comparison of the authorization models
 *
 *   | Model | … |
 *   | ----- | … |
 *
 * becomes
 *
 *   <figure class="table">
 *     <figcaption>Comparison of the authorization models</figcaption>
 *     <table>…</table>
 *   </figure>
 *
 * The "Table N." label is supplied by CSS counters, so numbering stays
 * automatic. Tables without a preceding "Table:" paragraph are left untouched.
 */
const isWhitespace = (node) =>
    node.type === "text" && node.value.trim() === "";

const textOf = (node) => {
    if (node.type === "text") return node.value;
    if (Array.isArray(node.children)) return node.children.map(textOf).join("");
    return "";
};

export default function rehypeTableCaptions() {
    return (tree) => {
        const visit = (node) => {
            if (!Array.isArray(node?.children)) return;

            node.children.forEach(visit);

            const children = node.children;
            for (let i = 0; i < children.length; i++) {
                const table = children[i];
                if (table.type !== "element" || table.tagName !== "table") {
                    continue;
                }

                // Find the previous meaningful sibling.
                let j = i - 1;
                while (j >= 0 && isWhitespace(children[j])) j--;
                const prev = children[j];
                if (!prev || prev.type !== "element" || prev.tagName !== "p") {
                    continue;
                }

                const match = textOf(prev).match(/^\s*Table:\s*([\s\S]+)$/);
                if (!match) continue;

                const caption = match[1].trim();
                if (!caption) continue;

                const figure = {
                    type: "element",
                    tagName: "figure",
                    properties: { className: ["table"] },
                    children: [
                        {
                            type: "element",
                            tagName: "figcaption",
                            properties: {},
                            children: [{ type: "text", value: caption }],
                        },
                        table,
                    ],
                };

                // Replace the caption paragraph … table run (and any
                // whitespace between them) with the single figure.
                children.splice(j, i - j + 1, figure);
                i = j;
            }
        };

        visit(tree);
    };
}
