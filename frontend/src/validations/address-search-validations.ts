import { z } from "zod";

export const addressSearchForm = z.object({
  address: z.string().min(1, "Address is required."),
});

export type TAddressSearchForm = z.infer<typeof addressSearchForm>;
