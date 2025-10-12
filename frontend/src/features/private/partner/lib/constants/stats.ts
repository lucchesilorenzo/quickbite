import { StatRange } from "@partner/types/stat-types";

export const statRanges: { value: StatRange; label: string }[] = [
  { value: "all", label: "All time" },
  { value: "7d", label: "Last 7 days" },
  { value: "14d", label: "Last 14 days" },
  { value: "30d", label: "Last 30 days" },
];
