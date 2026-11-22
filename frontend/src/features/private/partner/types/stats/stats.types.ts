import { PaymentMethod, StatRange } from "@/api/backend/models";

export type StatRangeWithAll = StatRange | "all";

export type PaymentMethodFilter = PaymentMethod | "all";
