import { MenuCategoryResource } from "@/api/models";
import { MenuItem } from "@/types/menu/menu.types";
import { BaseOffsetPagination } from "@/types/pagination.types";

export type PartnerMenu = Omit<MenuCategoryResource, "menu_items"> & {
  menu_items: PartnerMenuItemWithPagination;
};

export type PartnerMenuItemWithPagination = BaseOffsetPagination & {
  data: MenuItem[];
};
