import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerOffers } from "@/api/backend/endpoints/partner-offers/partner-offers";
import {
  CreateOfferRequest,
  CreatePartnerOffer201,
  CreatePartnerOffer422,
  CreatePartnerOffer500,
} from "@/api/backend/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

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

  return useMutation<
    CreatePartnerOffer201,
    ApiError<CreatePartnerOffer422 | CreatePartnerOffer500>,
    CreateOfferRequest
  >({
    mutationFn: async (data) => {
      const response = await getPartnerOffers(api).createPartnerOffer(
        restaurantId,
        data,
      );

      return response.data;
    },
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
