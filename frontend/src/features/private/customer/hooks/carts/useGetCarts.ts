import { useQuery } from "@tanstack/react-query";

import { GetCartsResponse } from "../../types/carts/cart.api.types";

import { useAuth } from "@/contexts/AuthProvider";
import { fetchData } from "@/lib/api-client";
import { isCustomer } from "@/lib/utils/auth.utils";

export function useGetCarts() {
  const { user } = useAuth();

  return useQuery<GetCartsResponse>({
    queryKey: ["customer-carts"],
    queryFn: () => fetchData("/customer/carts"),
    enabled: isCustomer(user) && !!user.email_verified_at,
  });
}
