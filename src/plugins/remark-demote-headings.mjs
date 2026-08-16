/**
 * Reserve level-one headings for the page title supplied by PostLayout.
 * This keeps headings written naturally in Obsidian in a valid page hierarchy.
 */
export default function remarkDemoteHeadings() {
    return (tree) => {
        const visit = (node) => {
            if (node?.type === "heading" && node.depth < 6) {
                node.depth += 1;
            }

            if (Array.isArray(node?.children)) {
                node.children.forEach(visit);
            }
        };

        visit(tree);
    };
}
