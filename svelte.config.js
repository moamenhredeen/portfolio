import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/kit/vite";

const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter()
  },
  paths: {
    base: process.env.NODE_ENV === "production" ? "/moamenhredeen.github.io/portfolio/" : ""
  }
};

export default config;
