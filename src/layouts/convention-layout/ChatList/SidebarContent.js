import React, { useState } from "react";
import "./chat.css";
import { Avatar, Box, List, Typography } from "@material-ui/core";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { openChat } from "../../../redux/chats/Action";

const SidebarContent = ({ setClose, setHidden }) => {
  // console.log(chats.map((value, index) => value.name));
  const dispatch = useDispatch();
  const { client, chatList } = useSelector((state) => state.chatReducer);
  const [activeChat, setActiveChat] = useState("");

  const handleOpenChat = (value) => {
    // console.log(value);
    setClose(false);
    setHidden(false);

    if (activeChat.id === value.id) return;

    setActiveChat(value);
    if (client !== "") {
      client.close();
      // console.log("Cerrando cliente");
    }
    // console.log(client);
    dispatch(openChat(value));
  };

  return (
    <Scrollbar style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 1 }}>
        <Box>
          <List>
            <li key={"chats"}>
              <Box
                className="subtitle"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 1,
                  pl: "8px",
                  pr: "8px",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="500"
                  sx={{ my: 2, mt: 4, fontSize: "17px" }}
                >
                  Chats:
                </Typography>
              </Box>
            </li>

            <List component="li" disablePadding key={"Feria Virtual"}>
              {chatList.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                    pl: "8px",
                    pr: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleOpenChat(value);
                  }}
                >
                  <Avatar
                    src={value.profile_image}
                    alt={value.first_name}
                    sx={{
                      width: "30px",
                      height: "30px",
                      mr: 1,
                    }}
                  />
                  <Typography
                    className="typografy"
                    sx={{ fontSize: "15px", textTransform: "capitalize" }}
                  >
                    {value.first_name || value.company}
                  </Typography>
                </Box>
              ))}
            </List>
          </List>
        </Box>
      </Box>
    </Scrollbar>
  );
};

export default SidebarContent;
