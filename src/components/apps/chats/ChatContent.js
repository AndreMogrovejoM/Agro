import React from "react";
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
} from "@material-ui/core";
import FeatherIcon from "feather-icons-react";
import { useSelector } from "react-redux";

import ChatMessages from "./ChatMessages";

const ChatContent = (props) => {
  const { chatUser } = useSelector((state) => state.chatReducer);

  // console.log("chatUser", chatUser);

  return (
    <Box>
      {chatUser ? (
        <div>
          <Box
            display="flex"
            alignItems="center"
            p={2}
            sx={{
              pt: "8px",
              pb: "7px",
            }}
          >
            <Box
              sx={{
                display: { xs: "block", md: "block", lg: "none" },
                mr: "10px",
              }}
            >
              <FeatherIcon
                icon="menu"
                width="18"
                onClick={props.toggleChatSidebar}
              />
            </Box>
            <ListItem key={chatUser.id} dense disableGutters>
              <ListItemAvatar>
                <Avatar
                  alt={chatUser.first_name || chatUser.company}
                  src={chatUser.profile_image}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h4">
                    {chatUser.first_name || chatUser.company}
                  </Typography>
                }
                secondary={chatUser.company}
              />
            </ListItem>
          </Box>
          <Divider />

          <ChatMessages />
        </div>
      ) : (
        <Box display="flex" alignItems="center" p={2} pb={1} pt={1}>
          <Box
            sx={{
              display: { xs: "flex", md: "flex", lg: "none" },
              mr: "10px",
            }}
          >
            <FeatherIcon
              icon="menu"
              width="18"
              onClick={props.toggleChatSidebar}
            />
          </Box>
          <Typography varient="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
