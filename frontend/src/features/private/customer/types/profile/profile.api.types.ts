import {
  TEditAddressFormSchema,
  TEditPersonalInfoField,
} from "../../schemas/profile.schema";

import { ApiResponse } from "@/types/api.types";
import { User } from "@/types/user.types";

export type UpdateAddressInfoResponse = {
  customer: Omit<User, "notification_preferences">;
} & ApiResponse;

export type UpdateAddressInfoRequest = TEditAddressFormSchema;

export type UpdatePersonalInfoResponse = UpdateAddressInfoResponse;

export type UpdatePersonalInfoRequest = TEditPersonalInfoField;
