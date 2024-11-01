import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import * as storage from 'src/auth/storage';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: `${process.env.API}`,
  withCredentials: true,
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

const setToken = () => {
  const tokenLocal = storage.getLocalToken();
  api.defaults.headers.common.Authorization = `Bearer ${tokenLocal}`;
};

// (api.defaults.headers.common.Authorization = `Bearer ${token}`);

// const setSucursal = (sucursalId: number) =>
//   (api.defaults.headers.common['x-header-poId'] = sucursalId);

const setPeriodo = (poId: number) =>
  (api.defaults.headers.common['x-header-poId'] = poId);

const deleteToken = () => delete api.defaults.headers.common['Authorization'];

export { api, setToken, setPeriodo, deleteToken };
