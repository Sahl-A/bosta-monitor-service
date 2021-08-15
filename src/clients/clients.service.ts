import { Inject, Injectable } from '@nestjs/common';
import { AxiosStatic } from 'axios';
import { IextendedAxiosResponse } from 'src/shared/interfaces/extendedAxiosResponse.interface';
import { IpollingRequestConfig } from '../shared/interfaces/pollingRequestConfig';

@Injectable()
export class ClientsService {
  // create axios instance
  private readonly httpClient = this.axios.create();

  constructor(
    @Inject('axios') private readonly axios: AxiosStatic,
    @Inject('interceptors') private readonly interceptors: any,
  ) {}

  httpClientAPI = {
    get: async (url: string, configData: IpollingRequestConfig) => {
      let httpRes: IextendedAxiosResponse;
      this.interceptors.addHeader(this.httpClient, configData);
      this.interceptors.changeResData(this.httpClient, configData);
      try {
        httpRes = await this.httpClient.get(url);
      } catch (err) {
        httpRes.data = { isSucceeded: false };
      }

      return httpRes;
    },
  };
}
