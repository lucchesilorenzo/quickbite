import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { KpiSummary, PaymentMethodFilter, StatRange } from "@/types";

type GetKpiSummary = {
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
}: GetKpiSummary) {
  return useQuery({
    queryKey: ["partner-stats", restaurantId, range, paymentMethod, year],
    queryFn: (): Promise<KpiSummary> => {
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
