import { TProfileGeneralFormSchema } from "../../schemas/profile-general.schema";
import { TProfileNotificationsFormSchema } from "../../schemas/profile-notifications.schema";

import { ApiResponse } from "@/types/api.types";
import { User } from "@/types/user.types";

export type UpdateProfileGeneralInformationResponse = {
  partner: Omit<User, "notification_preferences">;
} & ApiResponse;

export type UpdateProfileGeneralInformationPayload = TProfileGeneralFormSchema;

export type UpdateProfileNotificationsResponse = {
  partner: User;
} & ApiResponse;

export type UpdateProfileNotificationsPayload = TProfileNotificationsFormSchema;
