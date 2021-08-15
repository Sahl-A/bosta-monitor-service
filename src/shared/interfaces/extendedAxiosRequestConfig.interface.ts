import { AxiosRequestConfig } from 'axios';

interface AxiosRequestConfigMetadata {
  startTime?: any;
  endTime?: any;
}

export interface IextendedAxiosRequestConfig extends AxiosRequestConfig {
  metadata: AxiosRequestConfigMetadata;
}
