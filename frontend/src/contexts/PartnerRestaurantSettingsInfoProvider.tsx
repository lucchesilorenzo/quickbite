import { createContext, useState } from "react";

type PartnerRestaurantSettingsInfoProps = {
  children: React.ReactNode;
};

type PartnerRestaurantSettingsInfoContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PartnerRestaurantSettingsInfoContext =
  createContext<PartnerRestaurantSettingsInfoContext | null>(null);

export default function PartnerRestaurantSettingsInfoProvider({
  children,
}: PartnerRestaurantSettingsInfoProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <PartnerRestaurantSettingsInfoContext.Provider
      value={{ editMode, setEditMode }}
    >
      {children}
    </PartnerRestaurantSettingsInfoContext.Provider>
  );
}
