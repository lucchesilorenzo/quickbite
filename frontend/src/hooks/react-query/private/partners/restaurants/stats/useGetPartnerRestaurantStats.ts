import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Kpi, PaymentMethodFilter, Stat, StatRange } from "@/types";

type GetPartnerRestaurantStats = {
  restaurantId: string;
  kpi: Kpi;
  range: StatRange;
  paymentMethod: PaymentMethodFilter;
};

export function useGetPartnerRestaurantStats({
  restaurantId,
  kpi,
  range,
  paymentMethod,
}: GetPartnerRestaurantStats) {
  return useQuery({
    queryKey: ["partner-stats", restaurantId, kpi, range, paymentMethod],
    queryFn: (): Promise<Stat[]> => {
      const params = new URLSearchParams({
        kpi,
        ...(range !== "all" && { range }),
        ...(paymentMethod !== "all" && { payment_method: paymentMethod }),
      });

      return fetchData(
        `/partner/restaurants/${restaurantId}/stats?${params.toString()}`,
      );
    },
    initialData: [],
  });
}
