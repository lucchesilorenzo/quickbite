import z from "zod";

export const partnerRestaurantMenuCategoriesFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please fill out your menu category name.")
    .max(30, "Menu category name is too long."),
  description: z.string().trim().max(200, "Description is too long."),
});

export type TPartnerRestaurantMenuCategoriesForm = z.infer<
  typeof partnerRestaurantMenuCategoriesFormSchema
>;
