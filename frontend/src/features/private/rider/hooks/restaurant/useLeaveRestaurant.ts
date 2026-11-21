import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { getRiderRestaurant } from "@/api/endpoints/rider-restaurant/rider-restaurant";
import {
  LeaveRiderRestaurant200,
  LeaveRiderRestaurant404,
  LeaveRiderRestaurant409,
  LeaveRiderRestaurant500,
} from "@/api/models";
import api from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";

export function useLeaveRestaurant() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<
    LeaveRiderRestaurant200,
    ApiError<
      | LeaveRiderRestaurant404
      | LeaveRiderRestaurant409
      | LeaveRiderRestaurant500
    >,
    void
  >({
    mutationFn: async () => {
      const response = await getRiderRestaurant(api).leaveRiderRestaurant();

      return response.data;
    },
    onSuccess: (response) => {
      queryClient.removeQueries({ queryKey: ["rider-restaurant"] });

      navigate("/rider/job-posts");

      notifications.show(response.message, {
        key: "rider-leave-restaurant-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "rider-leave-restaurant-error",
        severity: "error",
      });
    },
  });
}
