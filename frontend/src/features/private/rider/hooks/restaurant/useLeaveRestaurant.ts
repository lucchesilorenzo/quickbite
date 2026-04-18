import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useNavigate } from "react-router-dom";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

export function useLeaveRestaurant() {
  const queryClient = useQueryClient();
  const notifications = useNotifications();
  const navigate = useNavigate();

  return useMutation<ApiResponse, Error, void>({
    mutationFn: () => deleteData("/rider/restaurant/leave"),
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
