import {
  BaseBroadcastNotification,
  BaseDatabaseNotification,
} from "@/types/notification.types";
import { BaseOffsetPagination } from "@/types/pagination.types";

// === Broadcast ===

export type NewOrderReceivedToBroadcast = BaseBroadcastNotification & {
  order_id: string;
};

export type NewReviewReceivedToBroadcast = BaseBroadcastNotification & {
  review_id: string;
};

// === Database ===

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
