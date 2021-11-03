import axios from "axios";
import Storage from "../storage";
import { hostUrlApi } from "../core/conf";

const instance = axios.create({
  baseURL: hostUrlApi,
});

instance.interceptors.request.use((config) => {
  const myConfig = config;
  const token = Storage.getToken();
  myConfig.headers.Authorization = token ? `Bearer ${token}` : "";
  return myConfig;
});

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (err) => {
//     const originalReq = err.config;
//     if (
//       err.response.status === 401 &&
//       err.config &&
//       !err.config.__isRetryRequest
//     ) {
//       err.config.__isRetryRequest = true;
//       try {
//         const res = await instance.post("auth/refresh", {
//           token: Storage.getToken(),
//           refreshToken: Storage.getRefreshToken(),
//         });

//         Storage.saveRefreshToken(res.data.refreshToken);
//         Storage.saveToken(res.data.token);

//         originalReq.headers.Authorization = `Bearer ${res.data.token}`;

//         return instance(originalReq);
//       } catch {
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// const config = () => ({});

// const Token = null;

// export { config, Token, hostUrlBase, hostUrlApi };

export default instance;
