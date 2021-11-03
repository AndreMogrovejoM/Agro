import { SIDE_BAR_AUTH, AUTH_USER } from "../constants";
import Storage from "../../storage";

export const setSideBarAuth = (sidebars) => {
  const temp = {};
  sidebars.map((sidebar) => (temp[sidebar.name] = sidebar.name));
  Storage.saveAuthPaths(JSON.stringify(sidebars));
  return {
    type: SIDE_BAR_AUTH,
    temp,
    sidebars,
  };
};

export const setUserProfile = (user) => {
  return {
    type: AUTH_USER,
    user,
  };
};
