import { StaffWithPagination } from "./staff.types";

import { ApiResponse } from "@/types/api.types";

export type GetStaffMembersResponse = {
  staff: StaffWithPagination;
} & ApiResponse;
