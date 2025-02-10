
/** @param {import("@11ty/eleventy").UserConfig} config */
export default async function (config) {

	// copy resources
	config.addPassthroughCopy("assets")

	// aliases
	config.addLayoutAlias("base", "base.liquid")

	// bundles
	config.addBundle("html")
}

export const config = {
	dir: {
		input: "src",
		layouts: "_layouts",
		output: "build"
	}
}
