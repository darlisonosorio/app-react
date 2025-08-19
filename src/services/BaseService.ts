import api from "./Api";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class BaseService {
  protected api: AxiosInstance;
  protected basePath: string;

  constructor(basePath: string) {
    this.api = api;
    this.basePath = basePath;
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.get<T>(`${this.basePath}${url}`, config);
  }

  public post<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.post<T>(`${this.basePath}${url}`, data, config);
  }

  public put<T>(url: string, data: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.put<T>(`${this.basePath}${url}`, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(`${this.basePath}${url}`, config);
  }

}
