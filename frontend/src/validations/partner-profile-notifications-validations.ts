import z from "zod";

export const partnerProfileNotificationsFormSchema = z.object({
  new_order: z.boolean({ error: "New order notifications is required." }),
  new_review: z.boolean({ error: "New review notifications is required." }),
});

export type TPartnerProfileNotificationsFormSchema = z.infer<
  typeof partnerProfileNotificationsFormSchema
>;
