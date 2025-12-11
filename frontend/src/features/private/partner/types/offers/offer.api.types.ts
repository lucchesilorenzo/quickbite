import { TRestaurantSettingsOffersFormSchema } from "../../schemas/restaurant-settings.schema";

import { ApiResponse } from "@/types/api.types";
import { Offer, OffersWithPagination } from "@/types/offers/offer.types";

export type GetOffersResponse = {
  offers: OffersWithPagination;
} & ApiResponse;

export type CreateOfferResponse = {
  offer: Offer;
} & ApiResponse;

export type CreateOfferPayload = TRestaurantSettingsOffersFormSchema;

export type UpdateOfferResponse = CreateOfferResponse;

export type UpdateOfferPayload = TRestaurantSettingsOffersFormSchema;
