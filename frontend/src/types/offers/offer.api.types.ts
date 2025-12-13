import { ApiResponse } from "../api.types";
import { OffersWithPagination } from "./offer.types";

export type GetOffersResponse = {
  offers: OffersWithPagination;
} & ApiResponse;
