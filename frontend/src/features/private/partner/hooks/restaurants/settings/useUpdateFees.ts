import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerRestaurants } from "@/api/endpoints/partner-restaurants/partner-restaurants";
import {
  UpdateFeesRequest,
  UpdatePartnerRestaurantFees200,
} from "@/api/models";
import api from "@/lib/api-client";

type UseUpdateFeesOptions = {
  restaurantId: string;
};

export function useUpdateFees({ restaurantId }: UseUpdateFeesOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<UpdatePartnerRestaurantFees200, Error, UpdateFeesRequest>({
    mutationFn: async (data) => {
      const response = await getPartnerRestaurants(
        api,
      ).updatePartnerRestaurantFees(restaurantId, data);

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-restaurants", restaurantId],
      });

      notifications.show(response.message, {
        key: "partner-update-fees-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-fees-error",
        severity: "error",
      });
    },
  });
}
