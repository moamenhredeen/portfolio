/**
 * Turn a standalone captioned image into a numbered <figure>.
 *
 * A paragraph whose only meaningful child is an <img> with non-empty alt
 * text becomes:
 *
 *   <figure class="figure">
 *     <img ...>
 *     <figcaption>{alt}</figcaption>
 *   </figure>
 *
 * The "Figure N." label is supplied by CSS counters, so numbering stays
 * automatic. Images with empty alt text are treated as decorative and left
 * untouched.
 */
const isWhitespace = (node) =>
    node.type === "text" && node.value.trim() === "";

export default function rehypeFigures() {
    return (tree) => {
        const visit = (node) => {
            if (Array.isArray(node?.children)) {
                node.children.forEach(visit);
            }

            if (node?.type !== "element" || node.tagName !== "p") {
                return;
            }

            const meaningful = node.children.filter((child) => !isWhitespace(child));
            if (meaningful.length !== 1) {
                return;
            }

            const img = meaningful[0];
            if (img.type !== "element" || img.tagName !== "img") {
                return;
            }

            const alt = typeof img.properties?.alt === "string"
                ? img.properties.alt.trim()
                : "";
            if (!alt) {
                return;
            }

            node.tagName = "figure";
            node.properties = { ...node.properties, className: ["figure"] };
            node.children = [
                img,
                {
                    type: "element",
                    tagName: "figcaption",
                    properties: {},
                    children: [{ type: "text", value: alt }],
                },
            ];
        };

        visit(tree);
    };
}
