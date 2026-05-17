import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { deleteData } from "@/lib/api-client";
import { ApiResponse } from "@/types/api.types";

type UseDeleteStaffMemberOptions = {
  restaurantId: string;
  staffId: string | null;
  setOpenDeleteStaffDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteStaffMember({
  restaurantId,
  staffId,
  setOpenDeleteStaffDialog,
}: UseDeleteStaffMemberOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ApiResponse>({
    mutationFn: () =>
      deleteData(`/partner/restaurants/${restaurantId}/staff/${staffId}`),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["partner-staff", restaurantId],
      });

      setOpenDeleteStaffDialog(false);

      notifications.show(response.message, {
        key: "partner-staff-delete-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "partner-staff-delete-error",
        severity: "error",
      });
    },
  });
}
