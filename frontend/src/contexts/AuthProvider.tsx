import { createContext, useEffect, useState } from "react";

import FullPageSpinner from "@/components/common/FullPageSpinner";
import { useAuthMe } from "@/hooks/react-query/private/auth/useAuthMe";
import { useGetUserNotifications } from "@/hooks/react-query/private/auth/useGetUserNotifications";
import { userNotificationDefaults } from "@/lib/query-defaults";
import { User, UserNotification } from "@/types";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContext = {
  user?: User | null;
  userNotifications: UserNotification;
};

export const AuthContext = createContext<AuthContext | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>();

  const { data, isLoading: isLoadingUser, isError } = useAuthMe();
  const {
    data: userNotifications = userNotificationDefaults,
    isLoading: isLoadingUserNotifications,
  } = useGetUserNotifications(user?.id);

  useEffect(() => {
    if (!isLoadingUser) {
      setUser(!isError ? data : null);
    }
  }, [data, isLoadingUser, isError]);

  if (user === undefined || isLoadingUserNotifications)
    return <FullPageSpinner />;

  return (
    <AuthContext.Provider value={{ user, userNotifications }}>
      {children}
    </AuthContext.Provider>
  );
}
