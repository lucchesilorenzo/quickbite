import { createContext, useState } from "react";

import { OrderStatusWithAll } from "@/types/order-types";

type PartnerOrdersProviderProps = {
  children: React.ReactNode;
};

type PartnerOrdersContext = {
  status: OrderStatusWithAll;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

export const PartnerOrdersContext = createContext<PartnerOrdersContext | null>(
  null,
);

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
