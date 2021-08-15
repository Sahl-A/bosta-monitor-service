import { AxiosInstance } from 'axios';
import { IpollingRequestConfig } from '../../shared/interfaces/pollingRequestConfig';

export default {
  // Example for adding request headers
  addHeader: (
    client: AxiosInstance,
    pollRequestConfig: IpollingRequestConfig,
  ) => {
    client.interceptors.request.use(
      (config) => {
        // set authentication if found
        if (pollRequestConfig.authentication) {
          config.headers['authentication'] = pollRequestConfig.authentication;
        }

        // set timeout if found
        config.timeout = pollRequestConfig.timeout && 5000;

        return config;
      },
      (error) => {
        console.log('error ====== inside axios request interceptor', error);
        return Promise.reject(error);
      },
    );
  },

  //Example for changing response data
  changeResData: (
    client: AxiosInstance,
    pollRequestConfig: IpollingRequestConfig,
  ) => {
    client.interceptors.response.use(
      (res) => {
        res.data = { isSucceeded: true };

        // assert statusCode if found
        if (pollRequestConfig.assert?.statusCode) {
          res.status = pollRequestConfig.assert.statusCode;
        }
        return res;
      },
      (error) => {
        console.log('error ====== inside axios response interceptor', error);
        return Promise.reject(error);
      },
    );
  },
};
