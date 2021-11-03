// import axios from "axios";
import { getMessagesByUser } from "../../services/Chats";
import {
  SELECTED_CHAT,
  SEARCH_USER,
  MSG_SUBMIT,
  FETCH_CHAT_SUCCESS,
  CREATE_CLIENT,
  GET_MSG,
  CHAT_LIST,
} from "../constants";

export const fetchChats = (id) => {
  return async (dispatch) => {
    try {
      const response = await getMessagesByUser(id);
      dispatch({
        type: FETCH_CHAT_SUCCESS,
        chats: response.data,
      });
    } catch (error) {
      // console.log("error", error);
    }
  };
};

// ///////////////////////////////////////////
// Axios part Reducers
// //////////////////////////////////////////

export const fetchChatsSuccess = (chats) => {
  return {
    type: FETCH_CHAT_SUCCESS,
    payload: chats,
  };
};

export const getMessages = (id, chatMsg) => {
  return {
    type: GET_MSG,
    id,
    chatMsg,
  };
};

export const openChat = (user) => ({
  type: SELECTED_CHAT,
  user,
});

export const chatSearch = (searchTerm) => ({
  type: SEARCH_USER,
  searchTerm,
});

export const sendMsg = (id, chatMsg) => ({
  type: MSG_SUBMIT,
  id,
  chatMsg,
});

export const createClient = (client) => ({
  type: CREATE_CLIENT,
  client,
});

export const setChatList = (list) => ({
  type: CHAT_LIST,
  list,
});
