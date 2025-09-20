import { createContext, useEffect, useState } from "react";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuthMe } from "@/hooks/react-query/private/auth/useAuthMe";
import { useGetUserNotifications } from "@/hooks/react-query/private/auth/useGetUserNotifications";
import { userNotificationDefaults } from "@/lib/query-defaults";
import { User, UserNotificationWithUnreadCount } from "@/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user?: User | null;
  userNotifications: UserNotificationWithUnreadCount;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>();
  const [page, setPage] = useState(1);

  const { data, isLoading: isLoadingUser, isError } = useAuthMe();
  const {
    data: userNotifications = userNotificationDefaults,
    isLoading: isLoadingUserNotifications,
  } = useGetUserNotifications(user?.id, page);

  useEffect(() => {
    if (!isLoadingUser) {
      setUser(!isError ? data : null);
    }
  }, [data, isLoadingUser, isError]);

  if (user === undefined || isLoadingUserNotifications) {
    return <FullPageSpinner />;
  }

  return (
    <AuthContext.Provider value={{ user, userNotifications, page, setPage }}>
      {children}
    </AuthContext.Provider>
  );
}
