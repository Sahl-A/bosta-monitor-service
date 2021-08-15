import { Inject, Injectable } from '@nestjs/common';
import { AxiosStatic } from 'axios';
import { IextendedAxiosResponse } from 'src/shared/interfaces/extendedAxiosResponse.interface';
import { IpollingRequestConfig } from '../shared/interfaces/pollingRequestConfig';

@Injectable()
export class ClientsService {
  constructor(
    @Inject('axios') private readonly axios: AxiosStatic,
    @Inject('interceptors') private readonly interceptors: any,
  ) {}

  httpClientAPI = {
    get: async (url: string, configData: IpollingRequestConfig) => {
      const httpClient = this.axios.create();
      let httpRes = {} as IextendedAxiosResponse;
      this.interceptors.addHeader(httpClient, configData);
      this.interceptors.changeResData(httpClient, configData);
      try {
        httpRes = await httpClient.get(url);
      } catch (err) {
        httpRes.data = { isSucceeded: false };
      }

      return httpRes;
    },
  };
}
