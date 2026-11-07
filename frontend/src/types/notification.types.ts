// === Broadcast ===
export type BaseBroadcastNotification = {
  id: string;
  type: string;
  title: string;
  description: string;
};

export type NewOrderReceivedToBroadcast = BaseBroadcastNotification & {
  order_id: string;
};

export type NewReviewReceivedToBroadcast = BaseBroadcastNotification & {
  review_id: string;
};

export type NewDeliveryReceivedToBroadcast = BaseBroadcastNotification & {
  delivery_id: string;
};
