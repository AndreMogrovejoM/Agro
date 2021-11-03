import React, { useEffect, useState } from "react";
import { Card, Divider, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createClient, setChatList } from "../../../redux/chats/Action";
import Breadcrumb from "../../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import ChatSidebar from "../../../components/apps/chats/ChatSidebar";
import ChatContent from "../../../components/apps/chats/ChatContent";
import ChatMsgSent from "../../../components/apps/chats/ChatMsgSent";
import { getChatList } from "../../../services/Chats";

const Chats = () => {
  const dispatch = useDispatch();

  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(true);
  const { chatUser, client, chatList } = useSelector(
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
    <PageContainer title="Chat" description="this is Chat page">
      <Breadcrumb title="Chat NetWorking" subtitle="Messenger"></Breadcrumb>
      <Card sx={{ display: "flex", p: 0, margin: "0 15px" }} variant="outlined">
        {chatList[0] !== undefined && (
          <ChatSidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onSidebarClose={() => setMobileSidebarOpen(false)}
          />
        )}
        <Box flexGrow={1}>
          <ChatContent toggleChatSidebar={() => setMobileSidebarOpen(true)} />
          <Divider />
          <ChatMsgSent />
        </Box>
      </Card>
    </PageContainer>
  );
};

export default Chats;
