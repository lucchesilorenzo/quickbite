import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

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

  return useMutation<ApiResponse>({
    mutationFn: () => deleteData(`/partner/restaurants/offers/${offerId}`),
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
