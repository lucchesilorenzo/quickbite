import { createContext, useContext, useState } from "react";

import { Address } from "@/types/address.types";

type AddressProviderProps = {
  children: React.ReactNode;
};

type AddressContext = {
  currentAddress: Address | null;
  setCurrentAddress: React.Dispatch<React.SetStateAction<Address | null>>;
};

const AddressContext = createContext<AddressContext | null>(null);

export default function AddressProvider({ children }: AddressProviderProps) {
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);

  return (
    <AddressContext.Provider value={{ currentAddress, setCurrentAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddress must be used within a AddressProvider.");
  }

  return context;
}
