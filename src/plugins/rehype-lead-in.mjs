/**
 * Wrap the first few words of the opening paragraph in
 * <span class="lead-in">…</span> so they can be set in small caps, the
 * classic companion to the drop cap.
 *
 * Only fires when the article opens with prose — i.e. the first block-level
 * element is a <p> whose first meaningful child is text — which is exactly the
 * condition the drop-cap CSS keys off (`.article-body > p:first-child`). Posts
 * that open with a heading, figure, or inline markup are left untouched.
 *
 * The word count is deliberately small; the styling lives in `PostLayout.astro`.
 */
const WORD_COUNT = 3;

export default function rehypeLeadIn() {
    return (tree) => {
        if (!Array.isArray(tree.children)) {
            return;
        }

        // First element child — matching the drop cap's `p:first-child`.
        // Whitespace text and MDX import/export nodes are skipped so the check
        // works for both `.md` and `.mdx` sources.
        const firstBlock = tree.children.find((node) => node.type === "element");
        if (!firstBlock || firstBlock.tagName !== "p") {
            return;
        }

        const firstChild = firstBlock.children?.[0];
        if (!firstChild || firstChild.type !== "text") {
            return;
        }

        // Find the offset just past the WORD_COUNT-th word.
        const value = firstChild.value;
        const wordRe = /\S+/g;
        let count = 0;
        let endIndex = 0;
        let match;
        while (count < WORD_COUNT && (match = wordRe.exec(value)) !== null) {
            count += 1;
            endIndex = match.index + match[0].length;
        }
        if (count === 0) {
            return;
        }

        const head = value.slice(0, endIndex);
        const tail = value.slice(endIndex);

        const replacement = [
            {
                type: "element",
                tagName: "span",
                properties: { className: ["lead-in"] },
                children: [{ type: "text", value: head }],
            },
        ];
        if (tail) {
            replacement.push({ type: "text", value: tail });
        }

        firstBlock.children.splice(0, 1, ...replacement);
    };
}
