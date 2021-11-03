import api from "./Api";
import Storage from "../storage";

const auth = (credentials) => {
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    try {
      const response = await api.post("/profile/login/", {
        email: credentials.email,
        password: credentials.password,
      });
      const {
        data: { access, refresh },
      } = response;
      if (access) Storage.saveToken(access);
      if (refresh) Storage.saveRefreshToken(refresh);
      // if (paths) Storage.savePaths(paths)
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
  return promise;
};

const signOut = () => {
  Storage.logOut();
  Storage.deleteFreeUser();
};

const GetAuthPaths = () => api.get("/paths/");

const freeLogin = (data) => api.post("/profile/free_login/", data);
const freeRegister = (data) => api.post("/profile/free_register/", data);

export { auth, signOut, GetAuthPaths, freeLogin, freeRegister };
