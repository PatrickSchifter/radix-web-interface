import axios from "axios";

class BackendApi {
  baseURL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;
  client = axios.create({ baseURL: this.baseURL });

  setBearerToken(token: string) {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseError(error: any) {
    const message =
      error?.response?.data?.message || error?.message || "Unknown error";
    const errors = error?.response?.data?.errors || [];
    const success = error?.response?.data?.success || false;
    const status = error?.response?.status || 500;
    return { message, errors, success, status, error };
  }
}

export const backendApi = new BackendApi();
