import {
  BaseBroadcastNotification,
  BaseDatabaseNotification,
} from "@/types/notification.types";
import { BaseOffsetPagination } from "@/types/pagination.types";

// TODO: to be defined in the backend

// === Broadcast ===

export type NewDeliveryReceivedToBroadcast = BaseBroadcastNotification & {
  delivery_id: string;
};

// === Database ===

export type NewDeliveryReceivedToDatabase = {
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

export type UserNotification = BaseDatabaseNotification & {
  data: NewDeliveryReceivedToDatabase;
};

export type UserNotificationWithPagination = BaseOffsetPagination & {
  data: UserNotification[];
};
