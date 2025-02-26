import webcPlugin from "@11ty/eleventy-plugin-webc";
import {readFileSync} from "fs";
import {EleventyHtmlBasePlugin} from '@11ty/eleventy'

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
  });

	// configure base url
	config.addPlugin(EleventyHtmlBasePlugin);
}

export const config = {
  dir: {
    input: "src",
    layouts: "_layouts",
    output: "build",
  },
	pathPrefix: "/portfolio/"
};
