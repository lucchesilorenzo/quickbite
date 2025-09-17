import { z } from "zod";

const envSchema = z.object({
  VITE_APP_NAME: z.string(),
  VITE_APP_DESCRIPTION: z.string(),
  VITE_BASE_URL: z.url(),
  VITE_LOCATIONIQ_API_KEY: z.string(),
  VITE_REVERB_APP_KEY: z.string(),
  VITE_REVERB_HOST: z.string(),
  VITE_REVERB_PORT: z.coerce.number(),
  VITE_REVERB_SCHEME: z.string(),
});

const env = envSchema.parse(import.meta.env);

export default env;
