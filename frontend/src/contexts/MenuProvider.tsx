import { createContext, useContext, useRef, useState } from "react";

import { useRestaurant } from "./RestaurantProvider";

import { useGetMenu } from "@/hooks/menu/useGetMenu";
import { Menu } from "@/types/menu-types";

type MenuProviderProps = {
  children: React.ReactNode;
};

type MenuContext = {
  menuData: Menu[];
  page: number;
  isLoadingMenu: boolean;
  menuCategoryRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const MenuContext = createContext<MenuContext | null>(null);

export default function MenuProvider({ children }: MenuProviderProps) {
  const { restaurant } = useRestaurant();

  const [page, setPage] = useState(1);
  const menuCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: menuData = [], isLoading: isLoadingMenu } = useGetMenu(
    restaurant.id,
    page,
  );

  return (
    <MenuContext.Provider
      value={{ menuData, page, isLoadingMenu, menuCategoryRefs, setPage }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider.");
  }

  return context;
}
