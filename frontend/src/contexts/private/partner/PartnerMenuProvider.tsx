import { createContext, useState } from "react";

type PartnerMenuProviderProps = {
  children: React.ReactNode;
};

type PartnerMenuContext = {
  selectedMenuCategoryId: string;
  setSelectedMenuCategoryId: React.Dispatch<React.SetStateAction<string>>;
};

export const PartnerMenuContext = createContext<PartnerMenuContext | null>(
  null,
);

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
