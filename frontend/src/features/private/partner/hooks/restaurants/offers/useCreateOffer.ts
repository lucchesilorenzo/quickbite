import {
  CreateOfferPayload,
  CreateOfferResponse,
} from "@partner/types/offers/offer.api.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { postData } from "@/lib/api-client";

type UseCreateOfferOptions = {
  restaurantId: string;
  setOpenAddOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useCreateOffer({
  restaurantId,
  setOpenAddOfferDialog,
}: UseCreateOfferOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<CreateOfferResponse, Error, CreateOfferPayload>({
    mutationFn: (data) =>
      postData(`/partner/restaurants/${restaurantId}/offers`, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      setOpenAddOfferDialog(false);

      notifications.show(response.message, {
        key: "partner-create-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-create-offer-error",
        severity: "error",
      });
    },
  });
}
