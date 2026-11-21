import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

import { ApiError, type ApiErrorData } from "./api-error";
import env from "./env";

import { refreshToken } from "@/services/auth.service";

const api = axios.create({
  baseURL: `${env.VITE_BACKEND_URL}/api`,
});

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
      throw new ApiError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred.",
      );
    }

    if (!error.config) {
      throw new ApiError("An unexpected error occurred.");
    }

    const originalRequest: InternalAxiosRequestConfig & { _retry?: boolean } =
      error.config;

    const isRefreshRequest = originalRequest.url?.includes("/auth/refresh");

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Unauthenticated." &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise = refreshToken().finally(() => {
            refreshPromise = null;
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

    const data = error.response?.data;
    const apiErrorData =
      data && typeof data === "object" ? (data as ApiErrorData) : null;

    throw new ApiError(
      apiErrorData?.message || error.message,
      error.response?.status ?? null,
      apiErrorData,
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
