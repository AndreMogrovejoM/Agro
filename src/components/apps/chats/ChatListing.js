import React, { useState } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Box,
} from "@material-ui/core";

import { CustomTextField } from "../../forms/custom-elements/CustomTextField";

import { useSelector, useDispatch } from "react-redux";
import {
  openChat,
  chatSearch,
  // fetchChatsSuccess,
} from "../../../redux/chats/Action";

// import { getMessagesByUser } from "../../../services/Chats";

import Scrollbar from "../../custom-scroll/Scrollbar";
// import { ChatData } from "../../../data/chats/ChatData";

const ChatListing = () => {
  const dispatch = useDispatch();
  const { client, chatList } = useSelector((state) => state.chatReducer);
  const [activeChat, setActiveChat] = useState("");

  /* *****Obtener todos los chats que tengo con este usuario********/
  // const fetchChats = async () => {
  //   try {
  //     const response = await getMessagesByUser(chatContent);
  //     dispatch(fetchChatsSuccess(response.data));
  //   } catch (error) {
  //     console.log(error + "action");
  //   }
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);
  /* *****Fin Obtener todos los chats que tengo con este usuario********/

  // const filterChats = (chats, chatSearch) => {
  //   if (chats)
  //     return chats.filter((t) =>
  //       t.name.toLocaleLowerCase().includes(chatSearch.toLocaleLowerCase())
  //     );
  //   else return chats;
  // };

  // const chats = useSelector((state) =>
  //   filterChats([], state.chatReducer.chatSearch)
  // );

  // console.log(chats);
  const handleCloseClient = (value) => {
    if (activeChat.id === value.id) return;
    if (client !== "") {
      client.close();
      // console.log("cerrando cliente");
    }
    // dispatch(fetchChatsSuccess(id))
    dispatch(openChat(value));
    setActiveChat(value);
  };

  return (
    <div>
      <Box
        p={2}
        sx={{
          pt: "21px",
          pb: "21px",
        }}
      >
        <CustomTextField
          id="outlined-search"
          placeholder="Search contacts"
          size="small"
          type="search"
          variant="outlined"
          inputProps={{ "aria-label": "Search Contacts" }}
          fullWidth
          onChange={(e) => dispatch(chatSearch(e.target.value))}
        />
      </Box>
      <Divider />
      <List sx={{ height: { lg: "calc(100vh - 365px)", sm: "100vh" }, p: 1 }}>
        <Scrollbar>
          {chatList.map((user, idx) => (
            <ListItem
              button
              alignItems="flex-start"
              key={idx}
              onClick={() => handleCloseClient(user)}
            >
              <ListItemAvatar>
                <Avatar alt={user.first_name} src={user.profile_image} />
              </ListItemAvatar>
              <ListItemText
                primary={user.first_name || user.company}
                secondary={user.company}
              />
            </ListItem>
          ))}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
