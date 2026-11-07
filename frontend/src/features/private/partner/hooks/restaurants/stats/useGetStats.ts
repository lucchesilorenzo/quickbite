import {
  PaymentMethodFilter,
  StatRange,
} from "@partner/types/stats/stats.types";
import { useQuery } from "@tanstack/react-query";

import { getPartnerStats } from "@/api/endpoints/partner-stats/partner-stats";
import {
  GetPartnerRestaurantStats200,
  GetPartnerRestaurantStatsParams,
  Kpi,
} from "@/api/models";
import api from "@/lib/api-client";

type UseGetStatsOptions = {
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
}: UseGetStatsOptions) {
  return useQuery<GetPartnerRestaurantStats200>({
    queryKey: ["partner-stats", restaurantId, kpi, range, paymentMethod, year],
    queryFn: async () => {
      const params: GetPartnerRestaurantStatsParams = { kpi };

      if (range !== "all") params.range = range;
      if (paymentMethod !== "all") params.payment_method = paymentMethod;
      if (year) params.year = year;

      const response = await getPartnerStats(api).getPartnerRestaurantStats(
        restaurantId,
        params,
      );

      return response.data;
    },
  });
}
