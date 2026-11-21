import { getPrivateAuth } from "@/api/endpoints/private-auth/private-auth";
import api from "@/lib/api-client";

export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  const { data } = await getPrivateAuth(api).refreshToken({
    refresh_token: refreshToken,
  });

  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);

  return data.access_token;
}
