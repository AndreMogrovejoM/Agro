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

const activeDir = Storage.getDirection();
const activeNavbarBg = Storage.getNabBar();
const activeSidebarBg = Storage.getSideBar();
const activeMode = Storage.getThemeMode();
const activeTheme = Storage.getThemeColor();
const activeLang = Storage.getLanguage();

const INIT_STATE = {
  activeDir: activeDir || "ltr",
  activeNavbarBg: activeNavbarBg || "#0b70fb", // This can be any color,
  activeSidebarBg: activeSidebarBg || "#ffffff", // This can be any color
  activeMode: activeMode || "light", // This can be light or dark
  activeTheme: activeTheme || "BLUE_THEME", // BLUE_THEME, GREEN_THEME, RED_THEME, BLACK_THEME, PURPLE_THEME, INDIGO_THEME
  SidebarWidth: 240,
  activeLang: activeLang || "es",
  loading: false,
};

const CustomizerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case NAVBAR_BG:
      return {
        ...state,
        activeNavbarBg: action.payload,
      };
    case DARK_THEME:
      return {
        ...state,
        activeMode: action.payload,
      };
    case SIDEBAR_BG:
      return {
        ...state,
        activeSidebarBg: action.payload,
      };
    case THEME_COLOR:
      return {
        ...state,
        activeTheme: action.payload,
      };
    case DIRECTION:
      return {
        ...state,
        activeDir: action.payload,
      };

    case LANGUAGE:
      return {
        ...state,
        activeLang: action.payload,
      };

    case LOADER:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default CustomizerReducer;
