import { createContext, useContext, useState } from "react";

type MenuProviderProps = {
  children: React.ReactNode;
};

type MenuContext = {
  selectedMenuCategoryId: string;
  setSelectedMenuCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

const MenuContext = createContext<MenuContext | null>(null);

export default function MenuProvider({ children }: MenuProviderProps) {
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState("");

  return (
    <MenuContext.Provider
      value={{ selectedMenuCategoryId, setSelectedMenuCategoryId }}
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
