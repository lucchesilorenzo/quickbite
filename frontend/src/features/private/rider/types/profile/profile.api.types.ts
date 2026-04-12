import { TProfileGeneralFormSchema } from "@rider/schemas/profile-general.schema";
import { TProfileNotificationsFormSchema } from "@rider/schemas/profile-notifications.schema";

import { ApiResponse } from "@/types/api.types";
import { User } from "@/types/user.types";

export type UpdateProfileGeneralInformationResponse = {
  rider: Omit<User, "notification_preferences">;
} & ApiResponse;

export type UpdateProfileGeneralInformationRequest = TProfileGeneralFormSchema;

export type UpdateProfileNotificationsResponse = {
  rider: User;
} & ApiResponse;

export type UpdateProfileNotificationsRequest = TProfileNotificationsFormSchema;
