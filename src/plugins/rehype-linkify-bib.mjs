/**
 * Make bare URLs inside the generated bibliography clickable.
 *
 * rehype-citation renders CSL bibliography entries with URLs as plain text
 * (e.g. "Available from: https://…"). This plugin walks the text nodes inside
 * the `#refs` block and splits out any http(s) URL into an <a> element, so the
 * References list keeps the clickable links the old resource lists had.
 *
 * Runs after rehype-citation. Scoped to `#refs` so nothing else on the page
 * is touched.
 */
const hasUrl = (value) => /https?:\/\//.test(value);

const linkifyText = (value) => {
    const nodes = [];
    let lastIndex = 0;
    // Fresh global regex per call so its lastIndex state can't leak between nodes.
    for (const match of value.matchAll(/https?:\/\/[^\s)]+/g)) {
        const url = match[0];
        if (match.index > lastIndex) {
            nodes.push({ type: "text", value: value.slice(lastIndex, match.index) });
        }
        nodes.push({
            type: "element",
            tagName: "a",
            properties: { href: url, rel: ["noopener", "noreferrer"] },
            children: [{ type: "text", value: url }],
        });
        lastIndex = match.index + url.length;
    }
    if (lastIndex < value.length) {
        nodes.push({ type: "text", value: value.slice(lastIndex) });
    }
    return nodes;
};

export default function rehypeLinkifyBib() {
    return (tree) => {
        const linkifyChildren = (node) => {
            if (!Array.isArray(node?.children)) {
                return;
            }
            const next = [];
            for (const child of node.children) {
                if (child.type === "text" && hasUrl(child.value)) {
                    next.push(...linkifyText(child.value));
                } else {
                    linkifyChildren(child);
                    next.push(child);
                }
            }
            node.children = next;
        };

        const findRefs = (node) => {
            if (node?.type === "element" && node.properties?.id === "refs") {
                linkifyChildren(node);
                return;
            }
            if (Array.isArray(node?.children)) {
                node.children.forEach(findRefs);
            }
        };

        findRefs(tree);
    };
}
