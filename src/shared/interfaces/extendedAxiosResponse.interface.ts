import { AxiosResponse } from 'axios';
import { IextendedAxiosRequestConfig } from './extendedAxiosRequestConfig.interface';

export interface IextendedAxiosResponse<T = any> extends AxiosResponse {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: IextendedAxiosRequestConfig;
  request?: any;
  responseTime?: number;
}
