import api from "./Api";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class BaseService {
  protected api: AxiosInstance;
  protected basePath: string;

  constructor(basePath: string) {
    this.api = api;
    this.basePath = basePath;
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(`${this.basePath}${url}`, config);
  }

  protected post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(`${this.basePath}${url}`, data, config);
  }

  protected put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(`${this.basePath}${url}`, data, config);
  }

  protected delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(`${this.basePath}${url}`, config);
  }

}
