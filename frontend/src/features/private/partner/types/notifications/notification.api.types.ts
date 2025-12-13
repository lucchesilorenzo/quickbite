import { UserNotificationWithPagination } from "./notification.types";

import { ApiResponse } from "@/types/api.types";

export type GetNotificationsResponse = {
  notifications: UserNotificationWithPagination;
  unread_count: number;
} & ApiResponse;
