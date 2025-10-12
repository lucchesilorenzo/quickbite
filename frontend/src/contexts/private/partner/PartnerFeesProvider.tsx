import { createContext, useContext, useState } from "react";

type PartnerFeesProviderProps = {
  children: React.ReactNode;
};

type PartnerFeesContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const PartnerFeesContext = createContext<PartnerFeesContext | null>(null);

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

export function usePartnerFees() {
  const context = useContext(PartnerFeesContext);

  if (!context) {
    throw new Error(
      "usePartnerFees must be used within a PartnerFeesProvider.",
    );
  }

  return context;
}
