import {
  SELECTED_CHAT,
  SEARCH_USER,
  MSG_SUBMIT,
  FETCH_CHAT_SUCCESS,
  CREATE_CLIENT,
  GET_MSG,
  CHAT_LIST,
} from "../constants";

const INIT_STATE = {
  client: "",
  chatUser: { channel: 1 },
  chatSearch: "",
  chatList: [],
  chats: [],
};

const ChatReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        chats: action.payload,
      };

    case SELECTED_CHAT:
      return {
        ...state,
        chatUser: action.user,
      };
    case MSG_SUBMIT:
      state.client.send(
        JSON.stringify({
          type: "message",
          message: action.chatMsg,
          id: action.id,
        })
      );
      return {
        ...state,

        // chats: state.chats.map((chat) =>
        //   chat.id === action.id
        //     ? Object.assign(
        //         {},
        //         chat,
        //         chat.chatHistory[0][1]["to"].push(action.chatMsg)
        //       )
        //     : chat
        // ),
      };
    case GET_MSG:
      return {
        ...state,
        chats: [
          ...state.chats,
          {
            id: action.id,
            msg: action.chatMsg,
          },
        ],
      };

    case SEARCH_USER:
      return {
        ...state,
        chatSearch: action.searchTerm,
      };
    case CHAT_LIST:
      return {
        ...state,
        chatList: action.list,
      };

    case CREATE_CLIENT:
      return {
        ...state,
        client: action.client,
      };
    default:
      return state;
  }
};

export default ChatReducer;
