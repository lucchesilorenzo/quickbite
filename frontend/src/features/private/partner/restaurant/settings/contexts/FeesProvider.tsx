import { createContext, useContext, useState } from "react";

type FeesProviderProps = {
  children: React.ReactNode;
};

type FeesContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const FeesContext = createContext<FeesContext | null>(null);

export default function FeesProvider({ children }: FeesProviderProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <FeesContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </FeesContext.Provider>
  );
}

export function useFees() {
  const context = useContext(FeesContext);

  if (!context) {
    throw new Error("useFees must be used within a FeesProvider.");
  }

  return context;
}
