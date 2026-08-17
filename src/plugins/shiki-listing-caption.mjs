/**
 * Shiki transformer: turn a captioned code fence into a numbered listing.
 *
 * A fence written as
 *
 *   ```ts caption="The debounce utility"
 *
 * is wrapped in <figure class="listing"> with a <figcaption> carrying the
 * caption text; CSS then prefixes it with "Listing N." via a counter. Fences
 * without a caption are left as a plain <pre> and stay unnumbered.
 *
 * The caption is read from the fence's info string, exposed by Shiki as
 * `this.options.meta.__raw`. Both `caption="…"` and `title="…"` are accepted.
 */
export default function transformerListingCaption() {
    return {
        name: "listing-caption",
        root(node) {
            const raw = this.options?.meta?.__raw ?? "";
            const match = raw.match(/(?:caption|title)="([^"]*)"/);
            if (!match) return;

            const caption = match[1];
            const pre = node.children.find(
                (child) => child.type === "element" && child.tagName === "pre",
            );
            if (!pre) return;

            const figure = {
                type: "element",
                tagName: "figure",
                properties: { className: ["listing"] },
                children: [
                    pre,
                    {
                        type: "element",
                        tagName: "figcaption",
                        properties: {},
                        children: [{ type: "text", value: caption }],
                    },
                ],
            };

            node.children = [figure];
        },
    };
}
