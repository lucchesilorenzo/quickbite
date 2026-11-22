import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:8000/docs/api.json",
    },
    output: {
      mode: "tags-split",
      target: "src/api/backend/endpoints",
      schemas: "src/api/backend/models",
      formatter: "prettier",
      client: "axios",
      httpClient: "axios",
      clean: true,
      override: {
        formData: {
          arrayHandling: "serialize-with-brackets",
        },
      },
    },
  },
  locationiq: {
    input: {
      target: "https://docs.locationiq.com/openapi.yaml",
    },
    output: {
      mode: "tags-split",
      target: "src/api/locationiq/endpoints",
      schemas: "src/api/locationiq/models",
      formatter: "prettier",
      client: "axios",
      httpClient: "axios",
      clean: true,
      override: {
        formData: {
          arrayHandling: "serialize-with-brackets",
        },
      },
    },
  },
});
