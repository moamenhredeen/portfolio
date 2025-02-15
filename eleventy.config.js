import webcPlugin from "@11ty/eleventy-plugin-webc";

/** @param {import("@11ty/eleventy").UserConfig} config */
export default async function (config) {
  // copy resources
  config.addPassthroughCopy("src/assets");

  // aliases
  config.addLayoutAlias("base", "base.webc");

  // bundles
  config.addBundle("css");
  config.addBundle("js");

  // plugins
  config.addPlugin(webcPlugin, {
    components: "src/_components",
  });
}

export const config = {
  dir: {
    input: "src",
    layouts: "_layouts",
    output: "build",
  },
};
