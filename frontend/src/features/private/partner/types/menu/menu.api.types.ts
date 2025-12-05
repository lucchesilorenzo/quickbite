import {
  TAddMenuCategoryFormSchema,
  TEditMenuCategoryFormSchema,
} from "../../schemas/menu.schema";
import { PartnerMenu } from "./menu.types";

import { ApiResponse } from "@/types/api.types";
import { MenuCategory, MenuItem } from "@/types/menu/menu.types";

// Menu
export type GetMenuResponse = PartnerMenu[];

export type CreateMenuCategoryResponse = {
  menu_category: Omit<MenuCategory, "menu_items">;
} & ApiResponse;

export type CreateMenuCategoryPayload = TAddMenuCategoryFormSchema;

// Menu Categories
export type UpdateMenuCategoriesOrderResponse = {
  menu_categories: string[];
} & ApiResponse;

export type UpdateMenuCategoriesOrderPayload = PartnerMenu[];

export type UpdateMenuCategoryResponse = {
  menu_category: Omit<MenuCategory, "menu_items">;
} & ApiResponse;

export type UpdateMenuCategoryPayload = TEditMenuCategoryFormSchema;

// Menu Items
export type CreateMenuItemResponse = { menu_item: MenuItem } & ApiResponse;

export type CreateMenuItemPayload = FormData;

export type UpdateMenuItemResponse = CreateMenuItemResponse;

export type UpdateMenuItemPayload = CreateMenuItemPayload;

export type UpdateMenuItemsOrderResponse = {
  menu_items: string[];
} & ApiResponse;

export type UpdateMenuItemsOrderPayload = MenuItem[];
