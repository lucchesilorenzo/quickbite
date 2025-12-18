import z from "zod";

export const profileNotificationsFormSchema = z.object({
  new_delivery: z.boolean({ error: "New delivery notifications is required." }),
});

export type TProfileNotificationsFormSchema = z.infer<
  typeof profileNotificationsFormSchema
>;
