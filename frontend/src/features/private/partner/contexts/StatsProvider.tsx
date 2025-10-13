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
  setRange: React.Dispatch<React.SetStateAction<StatRange>>;
  setActiveKpi: React.Dispatch<React.SetStateAction<Kpi>>;
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
  const [range, setRange] = useState<StatRange>("all");
  const [activeKpi, setActiveKpi] = useState<Kpi>("accepted_orders");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodFilter>("all");
  const [year, setYear] = useState<Record<Kpi, number>>({
    accepted_orders: new Date().getFullYear(),
    revenue: new Date().getFullYear(),
    rejected_orders: new Date().getFullYear(),
    lost_revenue: new Date().getFullYear(),
  });

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
        setRange,
        setActiveKpi,
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
