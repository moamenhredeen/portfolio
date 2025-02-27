import webcPlugin from "@11ty/eleventy-plugin-webc";
import { readFileSync } from "fs";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

/** @param {import("@11ty/eleventy").UserConfig} config */
export default async function (config) {

  config.setQuietMode(true);

  // copy resources
  config.addPassthroughCopy("src/assets/fonts");
  config.addPassthroughCopy("src/assets/img");

  // layouts
  config.setLayoutResolution(false)

  // plugins
  config.addPlugin(webcPlugin, {
    components: "src/_components",
  });

  // collections
  config.addCollection("tags", async (collectionApi) => {
    return new Set(collectionApi.getAll().flatMap((e) => e.data.tags));
  });

  config.addCollection("postsByYear", (collectionApi) => {
    const posts = collectionApi.getFilteredByTag("post").reverse();
    const years = posts.map((post) => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];
    const postsByYear = new Map();
    for (const year of uniqueYears) {
      postsByYear.set(year, posts.filter((post) => post.date.getFullYear() === year));
    }
    return postsByYear;
  });

  // shortcodes
  config.addJavaScriptFunction("svg", (name) => {
    return readFileSync(`./src/assets/icons/${name}.svg`, { encoding: "utf8" });
  });

  // TODO: i wanted to create global variables for the path prefix
  // config.addJavaScriptFunction("getDynamicCssVariables", () => {
  //   let prefix = "";
  //   if (config.pathPrefix.endsWith("/")) {
  //     prefix = config.pathPrefix.slice(config.pathPrefix.length - 1, 1);
  //   }
  //   return `
  //   :root{
  //     --path-prefix: "${prefix}";
  //     --computer-modern-serif-regular:  url("${prefix}/assets/cmu.serif-roman.ttf") format("truetype");
  //     --computer-modern-serif-bold:  url("${prefix}/assets/cmu.serif-bold.ttf") format("truetype");
  //     --requited-script-regular:  url("${prefix}/assets/cmu.serif-bold.ttf") format("truetype");
  //   }`
  // });

  config.addTemplateFormats("css");
  config.addExtension("css", {
    key: "liquid",
    outputFileExtension: "css"
  });

  // configure base url
  config.addPlugin(EleventyHtmlBasePlugin);
}

export const config = {
  markdownTemplateEngine: "liquid",
  htmlTemplateEngine: "liquid",
  dir: {
    input: "src",
    output: "build",
    layouts: "_layouts"
  },
};
