import axios from "axios";

import env from "@/lib/env";
import {
  RefreshTokenPayload,
  RefreshTokenResponse,
} from "@/types/auth/auth.api.types";

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  const payload: RefreshTokenPayload = {
    refresh_token: refreshToken,
  };

  const { data } = await axios.post<RefreshTokenResponse>(
    `${env.VITE_BACKEND_URL}/api/auth/refresh`,
    payload,
  );

  localStorage.setItem("token", data.token);
  localStorage.setItem("refresh_token", data.refresh_token);

  return data.token;
}
