import { GetStatsResponse } from "@partner/types/stats/stats.api.types";
import { useQuery } from "@tanstack/react-query";

import {
  Kpi,
  PaymentMethodFilter,
  StatRange,
} from "@/features/private/partner/types/stats/stats.types";
import { fetchData } from "@/lib/api-client";

type UseGetStats = {
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
}: UseGetStats) {
  return useQuery<GetStatsResponse>({
    queryKey: ["partner-stats", restaurantId, kpi, range, paymentMethod, year],
    queryFn: () => {
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
