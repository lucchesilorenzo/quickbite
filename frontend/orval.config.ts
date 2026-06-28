import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "http://localhost:8000/docs/api.json",
    output: {
      mode: "tags-split",
      target: "src/api/endpoints",
      schemas: "src/api/models",
      formatter: "prettier",
      client: "axios",
      httpClient: "axios",
    },
  },
});
