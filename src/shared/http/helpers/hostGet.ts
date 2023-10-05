import { AxiosRequestConfig } from 'axios';
import { $host } from '../host';

export const $hostGet = async (apiURL: string, params?: AxiosRequestConfig<any>) =>
  await $host.get(apiURL, params).then(res => {
    return res.data;
  });
