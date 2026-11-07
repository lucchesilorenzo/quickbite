import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPartnerStaff } from "@/api/endpoints/partner-staff/partner-staff";
import { DeletePartnerStaffMember200 } from "@/api/models";
import api from "@/lib/api-client";

type UseDeleteStaffMemberOptions = {
  restaurantId: string;
  staffId?: string;
  setOpenDeleteStaffDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useDeleteStaffMember({
  restaurantId,
  staffId,
  setOpenDeleteStaffDialog,
}: UseDeleteStaffMemberOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<DeletePartnerStaffMember200, Error, void>({
    mutationFn: async () => {
      const response = await getPartnerStaff(api).deletePartnerStaffMember(
        restaurantId,
        staffId ?? "",
      );

      return response.data;
    },
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
