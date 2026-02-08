// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var docs = defineDocs({
  docs: {},
  meta: {}
});
var source_config_default = defineConfig({});
export {
  source_config_default as default,
  docs
};
