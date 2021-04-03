import { DenonConfig } from "https://deno.land/x/denon@2.4.7/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run src/index.ts",
      desc: "run my index.ts file",
      allow: ["net", "env", "read"]
    },
  },
};

export default config;