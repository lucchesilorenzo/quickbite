import {
  BaseBroadcastNotification,
  BaseDatabaseNotification,
} from "@/types/notification.types";
import { BaseOffsetPagination } from "@/types/pagination.types";

// === Broadcast ===

export type NewDeliveryReceivedToBroadcast = BaseBroadcastNotification & {
  delivery_id: string;
};

// === Database ===

export type NewDeliveryReceivedToDatabase = {
  title: string;
  description: string;
  meta: {
    delivery_id: string;
    order_id: string;
    order_code: string;
    delivery_time: string;
    first_name: string;
    last_name: string;
    total: number;
    created_at: string;
  };
};

export type UserNotification = BaseDatabaseNotification & {
  data: NewDeliveryReceivedToDatabase;
};

export type UserNotificationWithPagination = BaseOffsetPagination & {
  data: UserNotification[];
};
