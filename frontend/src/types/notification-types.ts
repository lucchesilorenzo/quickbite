import { BaseOffsetPagination } from "./pagination-types";

// === Broadcast ===
export type BaseBroadcastNotification = {
  title: string;
  description: string;
};

export type NewOrderReceivedToBroadcast = BaseBroadcastNotification & {
  order_id: string;
};

export type NewReviewReceivedToBroadcast = BaseBroadcastNotification & {
  review_id: string;
};

// === Database ===
export type BaseDatabaseNotification = {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NewOrderReceivedToDatabase = {
  title: string;
  description: string;
  meta: {
    order_id: string;
    order_code: string;
    first_name: string;
    last_name: string;
    total: number;
    created_at: string;
  };
};

export type NewReviewReceivedToDatabase = {
  title: string;
  description: string;
  meta: {
    review_id: string;
    first_name: string;
    last_name: string;
    created_at: string;
  };
};

export type UserNotification = BaseDatabaseNotification & {
  data: NewOrderReceivedToDatabase | NewReviewReceivedToDatabase;
};

export type UserNotificationWithPagination = BaseOffsetPagination & {
  data: UserNotification[];
};

export type UserNotificationWithUnreadCount = {
  notifications: UserNotificationWithPagination;
  unread_count: number;
};
