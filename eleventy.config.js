import webcPlugin from "@11ty/eleventy-plugin-webc";
import {readFileSync} from "fs";
import Shiki from '@shikijs/markdown-it'
import MarkdownIt from 'markdown-it'
import { alert } from "@mdit/plugin-alert";
import { footnote } from "@mdit/plugin-footnote";
import { plantuml } from "@mdit/plugin-plantuml";


/** @param {import("@11ty/eleventy").UserConfig} config */
export default async function (config) {
  // copy resources
  config.addPassthroughCopy("src/assets");

  // aliases
  config.addLayoutAlias("base", "base.webc");
  config.addLayoutAlias("post", "post.webc");

  // plugins
  config.addPlugin(webcPlugin, {
    components: "src/_components",
  });

  // collections
  config.addCollection("tags", async (collectionApi) => {
    return new Set(collectionApi.getAll()
        .flatMap(e => e.data.tags)
        .filter(e => e !== undefined
            && e.trim() !== ''
            && !e.includes("games")));
  });

  config.addCollection("postsByYear", collectionApi => {
    const posts = collectionApi.getFilteredByTag("post").reverse();
    const years = posts.map(post => post.date.getFullYear());
    const uniqueYears = [...new Set(years)]
    const postsByYear = new Map();
    for (const year of uniqueYears) {
      postsByYear.set(year, posts.filter(post => post.date.getFullYear() === year));
    }
    return postsByYear
  });

  // shortcodes
  // TODO: why can not we do the function async
  config.addJavaScriptFunction("svg", (name) => {
    return  readFileSync(`./src/assets/icons/${name}.svg`, { encoding: "utf8" });
  })


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
