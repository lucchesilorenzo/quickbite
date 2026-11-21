import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerOrders } from "@/api/endpoints/partner-orders/partner-orders";
import {
  UpdateOrderStatus,
  UpdatePartnerOrderStatus200,
  UpdatePartnerOrderStatus409,
  UpdatePartnerOrderStatus500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

type UseUpdateOrderStatusOptions = {
  orderId: string;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export function useUpdateOrderStatus({
  orderId,
  setAnchorEl,
}: UseUpdateOrderStatusOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<
    UpdatePartnerOrderStatus200,
    ApiError<UpdatePartnerOrderStatus409 | UpdatePartnerOrderStatus500>,
    UpdateOrderStatus
  >({
    mutationFn: async (data) => {
      const response = await getPartnerOrders(api).updatePartnerOrderStatus(
        orderId,
        data,
      );

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-orders"],
      });

      setAnchorEl(null);

      notifications.show(response.message, {
        key: "partner-update-order-status-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-update-order-status-error",
        severity: "error",
      });
    },
  });
}
