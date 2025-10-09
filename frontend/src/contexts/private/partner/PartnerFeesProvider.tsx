import { createContext, useState } from "react";

type PartnerFeesProviderProps = {
  children: React.ReactNode;
};

type PartnerFeesContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PartnerFeesContext = createContext<PartnerFeesContext | null>(
  null,
);

export default function PartnerFeesProvider({
  children,
}: PartnerFeesProviderProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <PartnerFeesContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </PartnerFeesContext.Provider>
  );
}
