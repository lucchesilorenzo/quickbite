import {
  UpdateOfferPayload,
  UpdateOfferResponse,
} from "@partner/types/offers/offer.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { updateData } from "@/lib/api-client";

type UseUpdateOfferOptions = {
  restaurantId: string;
  offerId: string;
};

export function useUpdateOffer({
  restaurantId,
  offerId,
}: UseUpdateOfferOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdateOfferResponse, Error, UpdateOfferPayload>({
    mutationFn: (data) =>
      updateData(
        `/partner/restaurants/${restaurantId}/offers/${offerId}`,
        data,
      ),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-offer-error",
        severity: "error",
      });
    },
  });
}
