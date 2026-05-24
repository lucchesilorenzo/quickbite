import { BaseOffsetPagination } from "@/types/pagination.types";
import { User } from "@/types/user.types";

export type StaffWithPagination = BaseOffsetPagination & {
  data: User[];
};
