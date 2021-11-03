import { combineReducers } from "redux";
import CustomizerReducer from "./customizer/Reducer";
import chatReducer from "./chats/Reducer";
import notesReducer from "./notes/Reducer";
import emailReducer from "./email/";
import authReducer from "./Auth/Reducer"

const RootReducers = combineReducers({
  CustomizerReducer,
  chatReducer,
  notesReducer,
  emailReducer,
  authReducer,
});

export default RootReducers;
