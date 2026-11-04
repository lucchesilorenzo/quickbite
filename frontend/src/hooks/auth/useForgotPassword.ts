import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotifications } from "@toolpad/core/useNotifications";

import { getPrivateAuth } from "@/api/endpoints/private-auth/private-auth";
import { ForgotPassword200, ForgotPasswordRequest } from "@/api/models";
import api from "@/lib/api-client";

type UseForgotPasswordOptions = {
  setOpenForgotPasswordDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useForgotPassword({
  setOpenForgotPasswordDialog,
}: UseForgotPasswordOptions) {
  const queryClient = useQueryClient();
  const notifications = useNotifications();

  return useMutation<ForgotPassword200, Error, ForgotPasswordRequest>({
    mutationFn: async (data) => {
      const response = await getPrivateAuth(api).forgotPassword(data);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      setOpenForgotPasswordDialog(false);

      notifications.show("Email sent successfully.", {
        key: "forgot-password-success",
        severity: "success",
      });
    },
    onError: (error) => {
      notifications.show(error.message, {
        key: "forgot-password-error",
        severity: "error",
      });
    },
  });
}
