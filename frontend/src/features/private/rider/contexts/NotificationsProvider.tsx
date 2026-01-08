import { createContext, useContext, useState } from "react";

import { useGetNotifications } from "../hooks/notifications/useGetNotifications";
import { GetNotificationsResponse } from "../types/notifications/notification.api.types";

type NotificationsProviderProps = {
  children: React.ReactNode;
};

type NotificationsContext = {
  notificationsData?: GetNotificationsResponse;
  isLoadingNotifications: boolean;
  notificationsError: Error | null;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const NotificationsContext = createContext<NotificationsContext | null>(null);

export default function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const [page, setPage] = useState(1);

  const {
    data: notificationsData,
    isLoading: isLoadingNotifications,
    error: notificationsError,
  } = useGetNotifications({ page });

  return (
    <NotificationsContext.Provider
      value={{
        notificationsData,
        isLoadingNotifications,
        notificationsError,
        page,
        setPage,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationsProvider.",
    );
  }

  return context;
}
