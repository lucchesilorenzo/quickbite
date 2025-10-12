import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { Kpi, PaymentMethodFilter, StatRange, StatsWithFilters } from "@/types";

type GetStats = {
  restaurantId: string;
  kpi: Kpi;
  range: StatRange;
  paymentMethod: PaymentMethodFilter;
  year: number;
};

export function useGetStats({
  restaurantId,
  kpi,
  range,
  paymentMethod,
  year,
}: GetStats) {
  return useQuery({
    queryKey: ["partner-stats", restaurantId, kpi, range, paymentMethod, year],
    queryFn: (): Promise<StatsWithFilters> => {
      const params = new URLSearchParams();

      if (kpi) params.set("kpi", kpi);
      if (range !== "all") params.set("range", range);
      if (paymentMethod !== "all") params.set("payment_method", paymentMethod);
      if (year) params.set("year", year.toString());

      return fetchData(
        `/partner/restaurants/${restaurantId}/stats?${params.toString()}`,
      );
    },
  });
}
