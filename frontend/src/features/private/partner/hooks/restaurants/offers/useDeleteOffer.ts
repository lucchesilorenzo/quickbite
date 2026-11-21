import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerOffers } from "@/api/endpoints/partner-offers/partner-offers";
import { DeletePartnerOffer200, DeletePartnerOffer500 } from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseDeleteOfferOptions = {
  restaurantId: string;
  offerId: string;
  setOpenDeleteOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteOffer({
  restaurantId,
  offerId,
  setOpenDeleteOfferDialog,
}: UseDeleteOfferOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    DeletePartnerOffer200,
    ApiError<DeletePartnerOffer500>,
    void
  >({
    mutationFn: async () => {
      const response = await getPartnerOffers(api).deletePartnerOffer(offerId);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-offers", restaurantId],
      });

      setOpenDeleteOfferDialog(false);

      notifications.show(response.message, {
        key: "partner-delete-offer-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-delete-offer-error",
        severity: "error",
      });
    },
  });
}
