export type UserNotification = {
  notifications: {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: string;
    data: {
      order_id: string;
      order_code: number;
      customer_name: string;
      total: number;
      created_at: string;
    };
    read_at: string | null;
    created_at: string;
    updated_at: string;
  }[];
  unread_count: number;
};

export type NewOrderReceived = {
  order_id: string;
  title: string;
  description: string;
};
