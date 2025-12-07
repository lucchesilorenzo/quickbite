import { createContext, useContext, useRef, useState } from "react";

import { useRestaurant } from "./RestaurantProvider";

import { useGetMenu } from "@/hooks/menu/useGetMenu";
import { GetMenuResponse } from "@/types/menu/menu.api.types";

type MenuProviderProps = {
  children: React.ReactNode;
};

type MenuContext = {
  data: GetMenuResponse;
  isLoadingMenu: boolean;
  menuError: Error | null;
  page: number;
  menuCategoryRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  registerMenuCategoryRef: (
    menuCategoryId: string,
    el: HTMLDivElement | null,
  ) => void;
};

const MenuContext = createContext<MenuContext | null>(null);

export default function MenuProvider({ children }: MenuProviderProps) {
  const { restaurantData } = useRestaurant();

  const [page, setPage] = useState(1);

  const {
    data = { success: false, message: "", menu: [] },
    isLoading: isLoadingMenu,
    error: menuError,
  } = useGetMenu({
    restaurantId: restaurantData.restaurant.id,
    page,
  });

  const menuCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  function registerMenuCategoryRef(
    menuCategoryId: string,
    el: HTMLDivElement | null,
  ) {
    menuCategoryRefs.current[menuCategoryId] = el;
  }

  return (
    <MenuContext.Provider
      value={{
        data,
        page,
        isLoadingMenu,
        menuError,
        menuCategoryRefs,
        setPage,
        registerMenuCategoryRef,
      }}
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
