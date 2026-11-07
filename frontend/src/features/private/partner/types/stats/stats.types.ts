import {
  PaymentMethod as ApiPaymentMethod,
  StatRange as ApiStatRange,
} from "@/api/models";

export type StatRange = ApiStatRange | "all";

export type PaymentMethodFilter = ApiPaymentMethod | "all";
