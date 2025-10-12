import { createContext, useContext, useState } from "react";

import { OrderStatusWithAll } from "@/types/order-types";

type PartnerOrdersProviderProps = {
  children: React.ReactNode;
};

type PartnerOrdersContext = {
  status: OrderStatusWithAll;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

const PartnerOrdersContext = createContext<PartnerOrdersContext | null>(null);

export default function PartnerOrdersProvider({
  children,
}: PartnerOrdersProviderProps) {
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  return (
    <PartnerOrdersContext.Provider value={{ status, setStatus }}>
      {children}
    </PartnerOrdersContext.Provider>
  );
}

export function usePartnerOrders() {
  const context = useContext(PartnerOrdersContext);

  if (!context) {
    throw new Error(
      "usePartnerOrders must be used within a PartnerOrdersProvider.",
    );
  }

  return context;
}
