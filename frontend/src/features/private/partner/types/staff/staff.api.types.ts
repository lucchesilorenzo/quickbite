import { ApiResponse } from "@/types/api.types";
import { User } from "@/types/user.types";

export type GetStaffMembersResponse = {
  staff: User[];
} & ApiResponse;
