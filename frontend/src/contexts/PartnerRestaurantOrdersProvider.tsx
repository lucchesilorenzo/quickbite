import { createContext, useState } from "react";

import { OrderStatusWithAll } from "@/types/order-types";

type PartnerRestaurantOrdersProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantOrdersContext = {
  status: OrderStatusWithAll;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

export const PartnerRestaurantOrdersContext =
  createContext<PartnerRestaurantOrdersContext | null>(null);

export default function PartnerRestaurantOrdersProvider({
  children,
}: PartnerRestaurantOrdersProviderProps) {
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  return (
    <PartnerRestaurantOrdersContext.Provider value={{ status, setStatus }}>
      {children}
    </PartnerRestaurantOrdersContext.Provider>
  );
}
