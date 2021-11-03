import React, { useState, useEffect } from "react";
import "./chat.css";
import { Drawer } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import ChatActive from "../ChatActive/ChatActive";
import SidebarContent from "./SidebarContent";
import { createClient, setChatList } from "../../../redux/chats/Action";
import { getChatList } from "../../../services/Chats";

const ChatList = () => {
  const dispatch = useDispatch();
  const [close, setClose] = useState(true);
  const [chatHidden, setChatHidden] = useState(false);

  const { chatList, chatUser, client } = useSelector(
    (state) => state.chatReducer
  );

  const getChatsUsers = async () => {
    try {
      const response = await getChatList();
      dispatch(setChatList(response.data.usuarios_chat));
    } catch (error) {
      // console.log("error", error.message);
    }
  };

  useEffect(() => {
    if (chatList[0] !== undefined) return;
    getChatsUsers();
  }, []);

  const newClient = new WebSocket(
    // `ws://127.0.0.1:8000/ws/chat/${chatUser.channel}/`
    "ws://127.0.0.1:8000/ws/chat/test/"
  );

  useEffect(() => {
    if (client !== "") client.close();
    newClient.onopen = () => {
      dispatch(createClient(newClient));
      // console.log("WebSocket Client Connected");
    };
  }, [chatUser]);

  return (
    <Drawer
      anchor="right"
      open={true}
      variant="persistent"
      PaperProps={{
        sx: {
          width: "220px",
        },
      }}
    >
      <SidebarContent setClose={setClose} setHidden={setChatHidden} />
      {!close && (
        <ChatActive
          hidden={chatHidden}
          setClose={setClose}
          setHidden={setChatHidden}
        />
      )}
    </Drawer>
  );
};

export default ChatList;
