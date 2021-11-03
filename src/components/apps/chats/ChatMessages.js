import "./chat.css";
import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../../redux/chats/Action";
// gets the data from the action object and reducers defined earlier
function Chat() {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const { client, chats, chatUser } = useSelector((state) => state.chatReducer);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chats]);

  useEffect(() => {
    if (client !== "") {
      client.onmessage = (message) => {
        const dataFromServer = JSON.parse(message.data);
        // console.log("got reply! ", dataFromServer.message);
        if (dataFromServer) {
          dispatch(getMessages(dataFromServer.id, dataFromServer.message));
        }
      };
    }
  }, [client]);

  return (
    <div className="chat">
      <div className="chat-message">
        {chats.map((value, i) => {
          if (value.id === chatUser.id) {
            return (
              <Box
                display="flex"
                alignItems="start   "
                flexDirection="row"
                key={i}
              >
                <Box
                  mb={1}
                  sx={{
                    p: 2,
                    backgroundColor: "secondary.light",
                    borderRadius: "6px",
                    color: "#282c34",
                  }}
                >
                  {value.msg}
                </Box>
              </Box>
            );
          } else {
            return (
              <Box
                mb={1}
                display="flex"
                alignItems="flex-end"
                flexDirection="row-reverse"
                className="chat-content"
                key={i}
              >
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "primary.dark",
                    ml: "auto",
                    borderRadius: "6px",
                    color: "primary.light",
                  }}
                >
                  {value.msg}
                </Box>
              </Box>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
export default Chat;
