import { AxiosInstance } from 'axios';
import { IextendedAxiosRequestConfig } from 'src/shared/interfaces/extendedAxiosRequestConfig.interface';
import { IextendedAxiosResponse } from 'src/shared/interfaces/extendedAxiosResponse.interface';
import { IpollingRequestConfig } from '../../shared/interfaces/pollingRequestConfig';

export default {
  // Example for adding request headers
  addHeader: (
    client: AxiosInstance,
    pollRequestConfig: IpollingRequestConfig,
  ) => {
    client.interceptors.request.use(
      (config: IextendedAxiosRequestConfig) => {
        // set authentication if found
        if (pollRequestConfig.authentication) {
          config.headers['authentication'] = pollRequestConfig.authentication;
        }

        // set timeout if found
        config.timeout = pollRequestConfig.timeout && 5000;

        // Get time before sending request
        config.metadata = {};
        config.metadata.startTime = new Date();

        return config;
      },
      (error) => {
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
      (res: IextendedAxiosResponse) => {
        res.data = { isSucceeded: true };

        // Get time after sending a request
        res.config.metadata.endTime = new Date();

        // Get the response time
        res.responseTime =
          res.config.metadata.endTime - res.config.metadata.startTime;

        // assert statusCode if found
        if (pollRequestConfig.assert?.statusCode) {
          res.status = pollRequestConfig.assert.statusCode;
        }
        return res;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  },
};
