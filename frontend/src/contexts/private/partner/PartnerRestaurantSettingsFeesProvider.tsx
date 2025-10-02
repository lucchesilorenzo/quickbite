import { createContext, useState } from "react";

type PartnerRestaurantSettingsFeesProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantSettingsFeesContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PartnerRestaurantSettingsFeesContext =
  createContext<PartnerRestaurantSettingsFeesContext | null>(null);

export default function PartnerRestaurantSettingsFeesProvider({
  children,
}: PartnerRestaurantSettingsFeesProviderProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <PartnerRestaurantSettingsFeesContext.Provider
      value={{ editMode, setEditMode }}
    >
      {children}
    </PartnerRestaurantSettingsFeesContext.Provider>
  );
}
