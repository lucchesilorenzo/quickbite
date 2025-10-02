import { useContext } from "react";

import { CustomerCheckoutContext } from "@/contexts/private/customer/CustomerCheckoutProvider";

export function useCustomerCheckout() {
  const context = useContext(CustomerCheckoutContext);

  if (!context) {
    throw new Error(
      "useCustomerCheckout must be used within a CustomerCheckoutProvider.",
    );
  }

  return context;
}
