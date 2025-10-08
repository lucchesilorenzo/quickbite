import z from "zod";

export const profileNotificationsFormSchema = z.object({
  new_order: z.boolean({ error: "New order notifications is required." }),
  new_review: z.boolean({ error: "New review notifications is required." }),
});

export type TProfileNotificationsFormSchema = z.infer<
  typeof profileNotificationsFormSchema
>;
