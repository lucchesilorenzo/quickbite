// === Broadcast ===
export type BaseBroadcastNotification = {
  title: string;
  description: string;
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
