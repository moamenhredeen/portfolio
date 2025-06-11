import webcPlugin from "@11ty/eleventy-plugin-webc";
import {readFileSync} from "fs";
import Shiki from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'
import {alert} from "@mdit/plugin-alert";
import {footnote} from "@mdit/plugin-footnote";
import {plantuml} from "@mdit/plugin-plantuml";


/** @param {import("@11ty/eleventy").UserConfig} config */
export default async function (config) {
    // copy resources
    config.addPassthroughCopy("src/assets");
    config.addPassthroughCopy("src/gallery/*.jpg")

    // aliases
    config.addLayoutAlias("base", "base.webc");
    config.addLayoutAlias("post", "post.webc");
    config.addLayoutAlias("empty", "empty.webc");

    // plugins
    config.addPlugin(webcPlugin, {
        components: "src/_components/**/*.webc",
    });

    // collections
    config.addCollection("tagList", async (collectionApi) => {
        const tags = collectionApi.getAll()
            .flatMap(e => e.data.tags)
            .filter(e => e !== undefined && e !== '')
        const uniqueTags = new Set(tags);
        return [...uniqueTags]
    });

    const md = MarkdownIt()
    md.use(await Shiki({
        themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
        }
    }));
    md.use(alert);
    md.use(footnote);
    md.use(plantuml);
    config.setLibrary("md", md);
}

export const config = {
    dir: {
        input: "src",
        layouts: "_layouts",
        output: "build",
    },
};
