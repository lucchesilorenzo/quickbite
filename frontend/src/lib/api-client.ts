import axios, { AxiosInstance, isAxiosError } from "axios";

import env from "./env";

import { refreshToken } from "@/services/auth.service";

const api = axios.create({
  baseURL: `${env.VITE_BASE_URL}/api`,
});

export const externalApi = axios.create();

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch {
        localStorage.removeItem("token");
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
