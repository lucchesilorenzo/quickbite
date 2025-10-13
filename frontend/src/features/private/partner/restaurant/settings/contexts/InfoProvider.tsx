import { createContext, useContext, useState } from "react";

type InfoProviderProps = {
  children: React.ReactNode;
};

type InfoContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoContext = createContext<InfoContext | null>(null);

export default function InfoProvider({ children }: InfoProviderProps) {
  const [editMode, setEditMode] = useState(false);

  return (
    <InfoContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </InfoContext.Provider>
  );
}

export function useInfo() {
  const context = useContext(InfoContext);

  if (!context) {
    throw new Error("useInfo must be used within a InfoProvider.");
  }

  return context;
}
