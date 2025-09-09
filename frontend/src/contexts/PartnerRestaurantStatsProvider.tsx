import { createContext, useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { usePartnerRestaurant } from "@/hooks/contexts/usePartnerRestaurant";
import { useGetPartnerRestaurantStats } from "@/hooks/react-query/private/partners/restaurants/stats/useGetPartnerRestaurantStats";
import { kpiKeys, statRanges } from "@/lib/data";
import { Kpi, PaymentMethodFilter, Stat, StatRange } from "@/types";

type PartnerRestaurantStatsProviderProps = {
  children: React.ReactNode;
};

type PartnerRestaurantStatsContext = {
  range: StatRange;
  activeKpi: Kpi;
  paymentMethod: PaymentMethodFilter;
  stats: Stat[];
  isLoadingStats: boolean;
  setRange: React.Dispatch<React.SetStateAction<StatRange>>;
  setActiveKpi: React.Dispatch<React.SetStateAction<Kpi>>;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodFilter>>;
};

export const PartnerRestaurantStatsContext =
  createContext<PartnerRestaurantStatsContext | null>(null);

export default function PartnerRestaurantStatsProvider({
  children,
}: PartnerRestaurantStatsProviderProps) {
  const { restaurant } = usePartnerRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<StatRange>("all");
  const [activeKpi, setActiveKpi] = useState<Kpi>("accepted_orders");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>("all");

  const { data: stats, isLoading: isLoadingStats } =
    useGetPartnerRestaurantStats({
      restaurantId: restaurant.id,
      kpi: activeKpi,
      range,
      paymentMethod,
    });

  useEffect(() => {
    const range = searchParams.get("range");

    if (range) {
      const matchedRange = statRanges.find((r) => r.value === range);

      setRange(matchedRange?.value || "all");
    }
  }, [searchParams]);

  useEffect(() => {
    const kpi = searchParams.get("kpi") as Kpi | null;

    if (kpi && kpiKeys.includes(kpi)) {
      setActiveKpi(kpi);
    } else {
      setActiveKpi("accepted_orders");
      setSearchParams({
        ...Object.fromEntries(searchParams),
        kpi: "accepted_orders",
      });
    }
  }, [searchParams, setSearchParams]);

  return (
    <PartnerRestaurantStatsContext.Provider
      value={{
        range,
        activeKpi,
        paymentMethod,
        stats,
        isLoadingStats,
        setRange,
        setActiveKpi,
        setPaymentMethod,
      }}
    >
      {children}
    </PartnerRestaurantStatsContext.Provider>
  );
}
