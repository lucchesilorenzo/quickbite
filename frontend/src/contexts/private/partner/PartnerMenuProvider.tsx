import { createContext, useContext, useState } from "react";

type PartnerMenuProviderProps = {
  children: React.ReactNode;
};

type PartnerMenuContext = {
  selectedMenuCategoryId: string;
  setSelectedMenuCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

const PartnerMenuContext = createContext<PartnerMenuContext | null>(null);

export default function PartnerMenuProvider({
  children,
}: PartnerMenuProviderProps) {
  const [selectedMenuCategoryId, setSelectedMenuCategoryId] = useState("");

  return (
    <PartnerMenuContext.Provider
      value={{ selectedMenuCategoryId, setSelectedMenuCategoryId }}
    >
      {children}
    </PartnerMenuContext.Provider>
  );
}

export function usePartnerMenu() {
  const context = useContext(PartnerMenuContext);

  if (!context) {
    throw new Error(
      "usePartnerMenu must be used within a PartnerMenuProvider.",
    );
  }

  return context;
}
