import axios, { AxiosInstance, isAxiosError } from "axios";

import env from "./env";

import { refreshToken } from "@/services/auth.service";

const api = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api`,
});

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
    }

    if (response.data.refresh_token) {
      localStorage.setItem("refresh_token", response.data.refresh_token);
    }

    return response;
  },
  async (error) => {
    if (!isAxiosError(error)) {
      throw new Error("An unexpected error occurred.");
    }

    const originalRequest = error.config as any;

    if (
      error.response?.status === 401 &&
      error.response.data.message === "Unauthenticated." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshToken().finally(() => {
            isRefreshing = false;
          });
        }

        const newToken = await refreshPromise;

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }

    throw new Error(
      error.response?.data?.message ||
        "An error occurred while making the request.",
    );
  },
);

export async function fetchData<TResponse>(
  endpoint: string,
  axiosInstance: AxiosInstance = api,
): Promise<TResponse> {
  const response = await axiosInstance.get(endpoint);
  return response.data;
}

export async function postData<TResponse, TBody = unknown>(
  endpoint: string,
  data?: TBody,
  axiosInstance: AxiosInstance = api,
): Promise<TResponse> {
  const response = await axiosInstance.post(endpoint, data);
  return response.data;
}

export async function updateData<TResponse, TBody = unknown>(
  endpoint: string,
  data?: TBody,
  axiosInstance: AxiosInstance = api,
): Promise<TResponse> {
  const response = await axiosInstance.patch(endpoint, data);
  return response.data;
}

export async function deleteData<TResponse = unknown>(
  endpoint: string,
  axiosInstance: AxiosInstance = api,
): Promise<TResponse> {
  const response = await axiosInstance.delete(endpoint);
  return response.data;
}

export default api;
