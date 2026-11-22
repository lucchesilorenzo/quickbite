import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerOffers } from "@/api/backend/endpoints/partner-offers/partner-offers";
import {
  UpdateOfferRequest,
  UpdatePartnerOffer200,
  UpdatePartnerOffer500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateOfferOptions = {
  restaurantId: string;
  offerId: string;
  setOpenEditOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useUpdateOffer({
  restaurantId,
  offerId,
  setOpenEditOfferDialog,
}: UseUpdateOfferOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerOffer200,
    ApiError<UpdatePartnerOffer500>,
    UpdateOfferRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerOffers(api).updatePartnerOffer(
        restaurantId,
        offerId,
        data,
      );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      setOpenEditOfferDialog(false);

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
