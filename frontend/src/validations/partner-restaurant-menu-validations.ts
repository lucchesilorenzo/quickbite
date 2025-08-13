import z from "zod";

export const partnerRestaurantMenuCategoriesFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please fill out your menu category name.")
    .max(30, "Menu category name is too long."),
  description: z.string().trim().max(200, "Description is too long."),
});

export const partnerRestaurantMenuItemFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please fill out your menu item name.")
    .max(30, "Menu item name is too long."),
  description: z.string().trim().max(200, "Description is too long."),
  price: z.coerce
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Price is required."
          : "Price must be a number.",
    })
    .min(1, "Price must be at least €1,00.")
    .max(100, "Price must be less than €100,00."),
  image: z.union([z.string(), z.instanceof(FileList)]).nullable(),
});

export const partnerRestaurantMenuEditMenuItemFormSchema = z.object({
  ...partnerRestaurantMenuItemFormSchema.shape,
  is_available: z.boolean(),
});

export type TPartnerRestaurantMenuCategoriesFormSchema = z.infer<
  typeof partnerRestaurantMenuCategoriesFormSchema
>;

export type TPartnerRestaurantMenuItemFormSchema = z.infer<
  typeof partnerRestaurantMenuItemFormSchema
>;

export type TPartnerRestaurantMenuEditMenuItemFormSchema = z.infer<
  typeof partnerRestaurantMenuEditMenuItemFormSchema
>;
