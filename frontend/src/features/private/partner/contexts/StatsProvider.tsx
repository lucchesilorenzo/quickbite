import { createContext, useContext, useEffect, useState } from "react";

import { useGetKpiSummary } from "@partner/hooks/restaurants/stats/useGetKpiSummary";
import { useGetStats } from "@partner/hooks/restaurants/stats/useGetStats";
import { statRanges } from "@partner/lib/constants/stats";
import {
  Kpi,
  KpiSummary,
  PaymentMethodFilter,
  StatRange,
  StatsWithFilters,
} from "@partner/types/stat-types";
import { useSearchParams } from "react-router-dom";

import { kpiSummaryDefaults, statsDefaults } from "../lib/query-defaults";
import { useRestaurant } from "./RestaurantProvider";

type StatsProviderProps = {
  children: React.ReactNode;
};

type StatsContext = {
  range: StatRange;
  activeKpi: Kpi;
  paymentMethod: PaymentMethodFilter;
  statsData: StatsWithFilters;
  isLoadingStats: boolean;
  year: Record<Kpi, number>;
  kpiSummary: KpiSummary;
  isLoadingKpiSummary: boolean;
  setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethodFilter>>;
  setYear: React.Dispatch<React.SetStateAction<Record<Kpi, number>>>;
};

const StatsContext = createContext<StatsContext | null>(null);

const kpiKeys: Kpi[] = [
  "accepted_orders",
  "revenue",
  "rejected_orders",
  "lost_revenue",
];

export default function StatsProvider({ children }: StatsProviderProps) {
  const { restaurant } = useRestaurant();

  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>("all");
  const [year, setYear] = useState<Record<Kpi, number>>({
    accepted_orders: new Date().getFullYear(),
    revenue: new Date().getFullYear(),
    rejected_orders: new Date().getFullYear(),
    lost_revenue: new Date().getFullYear(),
  });

  const rangeParam = searchParams.get("range");
  const kpiParam = searchParams.get("kpi") as Kpi | null;

  const range: StatRange =
    statRanges.find((r) => r.value === rangeParam)?.value || "all";

  const activeKpi: Kpi =
    kpiParam && kpiKeys.includes(kpiParam) ? kpiParam : "accepted_orders";

  useEffect(() => {
    if (!kpiParam) {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        kpi: "accepted_orders",
      });
    }
  }, [kpiParam, searchParams, setSearchParams]);

  const {
    data: kpiSummary = kpiSummaryDefaults,
    isLoading: isLoadingKpiSummary,
  } = useGetKpiSummary({
    restaurantId: restaurant.id,
    range,
    paymentMethod,
    year: year[activeKpi],
  });

  const { data: statsData = statsDefaults, isLoading: isLoadingStats } =
    useGetStats({
      restaurantId: restaurant.id,
      kpi: activeKpi,
      range,
      paymentMethod,
      year: year[activeKpi],
    });

  return (
    <StatsContext.Provider
      value={{
        range,
        activeKpi,
        paymentMethod,
        statsData,
        isLoadingStats,
        year,
        kpiSummary,
        isLoadingKpiSummary,
        setPaymentMethod,
        setYear,
      }}
    >
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error("useStats must be used within a StatsProvider.");
  }
  return context;
}
