import { GetKpiSummaryResponse } from "@partner/types/stats/stats.api.types";
import { useQuery } from "@tanstack/react-query";

import {
  PaymentMethodFilter,
  StatRange,
} from "@/features/private/partner/types/stats/stats.types";
import { fetchData } from "@/lib/api-client";

type UseGetKpiSummary = {
  restaurantId: string;
  range: StatRange;
  paymentMethod: PaymentMethodFilter;
  year: number;
};

export function useGetKpiSummary({
  restaurantId,
  range,
  paymentMethod,
  year,
}: UseGetKpiSummary) {
  return useQuery<GetKpiSummaryResponse>({
    queryKey: ["partner-stats", restaurantId, range, paymentMethod, year],
    queryFn: () => {
      const params = new URLSearchParams();

      if (range !== "all") params.set("range", range);
      if (paymentMethod !== "all") params.set("payment_method", paymentMethod);
      if (year) params.set("year", year.toString());

      return fetchData(
        `/partner/restaurants/${restaurantId}/stats/kpis?${params.toString()}`,
      );
    },
  });
}
