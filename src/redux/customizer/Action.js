import {
  THEME_COLOR,
  NAVBAR_BG,
  SIDEBAR_BG,
  DIRECTION,
  DARK_THEME,
  LANGUAGE,
  LOADER,
} from "../constants";

import Storage from "../../storage";

export const setTheme = (payload) => {
  Storage.saveThemeColor(payload);
  return {
    type: THEME_COLOR,
    payload,
  };
};
export const setDarkMode = (payload) => {
  Storage.saveThemeMode(payload);
  return {
    type: DARK_THEME,
    payload,
  };
};
export const setNavbarBg = (payload) => {
  Storage.saveNabBar(payload);
  return {
    type: NAVBAR_BG,
    payload,
  };
};

export const setSidebarBg = (payload) => {
  Storage.saveSideBar(payload);
  return {
    type: SIDEBAR_BG,
    payload,
  };
};

export const setDir = (payload) => {
  Storage.saveDirection(payload);
  return {
    type: DIRECTION,
    payload,
  };
};

export const setLang = (payload) => {
  Storage.saveLanguage(payload);
  return {
    type: LANGUAGE,
    payload,
  };
};

export const setIsLoading = (payload) => {
  return {
    type: LOADER,
    payload,
  };
};
