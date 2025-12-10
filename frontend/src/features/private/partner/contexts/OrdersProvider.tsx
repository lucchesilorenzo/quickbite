import { createContext, useContext, useState } from "react";

import { OrderStatusWithAll } from "@private/shared/types/order.types";

type OrdersProviderProps = {
  children: React.ReactNode;
};

type OrdersContext = {
  status: OrderStatusWithAll;
  setStatus: React.Dispatch<React.SetStateAction<OrderStatusWithAll>>;
};

const OrdersContext = createContext<OrdersContext | null>(null);

export default function OrdersProvider({ children }: OrdersProviderProps) {
  const [status, setStatus] = useState<OrderStatusWithAll>("all");

  return (
    <OrdersContext.Provider value={{ status, setStatus }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used within a OrdersProvider.");
  }

  return context;
}
