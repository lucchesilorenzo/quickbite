import { DashboardStats, KpiSummary, StatsWithFilters } from "./stats.types";

import { ApiResponse } from "@/types/api.types";

export type GetStatsResponse = StatsWithFilters & ApiResponse;

export type GetDashboardStatsResponse = DashboardStats & ApiResponse;

export type GetKpiSummaryResponse = KpiSummary & ApiResponse;
