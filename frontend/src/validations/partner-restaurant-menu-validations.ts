import z from "zod";

export const partnerRestaurantMenuCategoriesFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please fill out your menu category name.")
    .max(30, "Menu category name is too long."),
  description: z.string().trim().max(200, "Description is too long."),
});

export const partnerRestaurantMenuCategoriesEditFormSchema = z.object({
  ...partnerRestaurantMenuCategoriesFormSchema.shape,
  order: z.coerce.number({
    error: (issue) =>
      issue.input === undefined
        ? "Order is required."
        : "Order must be a number.",
  }),
});

export type TPartnerRestaurantMenuCategoriesForm = z.infer<
  typeof partnerRestaurantMenuCategoriesFormSchema
>;

export type TPartnerRestaurantMenuCategoriesEditForm = z.infer<
  typeof partnerRestaurantMenuCategoriesEditFormSchema
>;
