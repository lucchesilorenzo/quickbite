import { createContext, useContext, useState } from "react";

type PartnerInfoProviderProps = {
  children: React.ReactNode;
};

type PartnerInfoContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const PartnerInfoContext = createContext<PartnerInfoContext | null>(null);

export default function PartnerInfoProvider({
  children,
}: PartnerInfoProviderProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <PartnerInfoContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </PartnerInfoContext.Provider>
  );
}

export function usePartnerInfo() {
  const context = useContext(PartnerInfoContext);

  if (!context) {
    throw new Error(
      "usePartnerInfo must be used within a PartnerInfoProvider.",
    );
  }

  return context;
}
