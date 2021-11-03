import { SIDE_BAR_AUTH, AUTH_USER } from "../constants";
import Storage from "../../storage";

const sidebarInit = Storage.getAuthPaths();
const temp = {};
if (sidebarInit) {
  const activeAuth = JSON.parse(sidebarInit);

  activeAuth.map((path) => (temp[path.name] = path.name));
}

const INIT_STATE = {
  auth: sidebarInit ? temp : {},
  sidebar: sidebarInit ? JSON.parse(sidebarInit) : {},
  user: null,
};

const AuthReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIDE_BAR_AUTH:
      return {
        ...state,
        auth: action.temp,
        sidebar: action.sidebars,
      };

    case AUTH_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default AuthReducer;
