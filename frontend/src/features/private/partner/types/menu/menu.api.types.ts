import {
  TAddMenuCategoryFormSchema,
  TEditMenuCategoryFormSchema,
} from "../../schemas/menu.schema";
import { PartnerMenu } from "./menu.types";

import { ApiResponse } from "@/types/api.types";
import { MenuCategory, MenuItem } from "@/types/menu/menu.types";

// Menu
export type GetMenuResponse = {
  menu: PartnerMenu[];
} & ApiResponse;

export type CreateMenuCategoryResponse = {
  menu_category: Omit<MenuCategory, "menu_items">;
} & ApiResponse;

export type CreateMenuCategoryRequest = TAddMenuCategoryFormSchema;

// Menu Categories
export type UpdateMenuCategoriesOrderResponse = {
  menu_categories: string[];
} & ApiResponse;

export type UpdateMenuCategoriesOrderRequest = PartnerMenu[];

export type UpdateMenuCategoryResponse = CreateMenuCategoryResponse;

export type UpdateMenuCategoryRequest = TEditMenuCategoryFormSchema;

// Menu Items
export type CreateMenuItemResponse = {
  menu_item: MenuItem;
} & ApiResponse;

export type CreateMenuItemRequest = FormData;

export type UpdateMenuItemResponse = CreateMenuItemResponse;

export type UpdateMenuItemRequest = CreateMenuItemRequest;

export type UpdateMenuItemsOrderResponse = {
  menu_items: string[];
} & ApiResponse;

export type UpdateMenuItemsOrderRequest = MenuItem[];
