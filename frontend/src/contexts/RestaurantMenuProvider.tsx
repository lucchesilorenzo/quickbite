import { createContext, useRef, useState } from "react";

import { useSingleRestaurant } from "@/hooks/contexts/useSingleRestaurant";
import { useGetRestaurantMenu } from "@/hooks/react-query/public/restaurants/useGetRestaurantMenu";
import { Menu } from "@/types";

type RestaurantMenuProviderProps = {
  children: React.ReactNode;
};

type RestaurantMenuContext = {
  menuData: Menu[];
  page: number;
  isLoadingMenu: boolean;
  menuCategoryRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const RestaurantMenuContext =
  createContext<RestaurantMenuContext | null>(null);

export default function RestaurantMenuProvider({
  children,
}: RestaurantMenuProviderProps) {
  const { restaurant } = useSingleRestaurant();

  const [page, setPage] = useState(1);
  const menuCategoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { data: menuData, isLoading: isLoadingMenu } = useGetRestaurantMenu(
    restaurant.id,
    page,
  );

  return (
    <RestaurantMenuContext.Provider
      value={{ menuData, page, isLoadingMenu, menuCategoryRefs, setPage }}
    >
      {children}
    </RestaurantMenuContext.Provider>
  );
}
