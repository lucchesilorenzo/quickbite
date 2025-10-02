import { createContext, useState } from "react";

type PartnerRestaurantMenuProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantMenuContext = {
  selectedMenuCategoryId: string;
  setSelectedMenuCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const PartnerRestaurantMenuContext =
  createContext<PartnerRestaurantMenuContext | null>(null);

export default function PartnerRestaurantMenuProvider({
  children,
}: PartnerRestaurantMenuProviderProps) {
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState("");

  return (
    <PartnerRestaurantMenuContext.Provider
      value={{ selectedMenuCategoryId, setSelectedMenuCategoryId }}
    >
      {children}
    </PartnerRestaurantMenuContext.Provider>
  );
}
