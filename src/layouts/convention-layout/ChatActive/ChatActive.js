import React, { useState, useRef, useEffect } from "react";
import { AppBar, Avatar } from "@material-ui/core";
import FeatherIcon from "feather-icons-react";
import { useDispatch, useSelector } from "react-redux";
import { sendMsg, getMessages } from "../../../redux/chats/Action";

import "./chatActive.css";

const ChatActive = ({ hidden, setHidden, setClose }) => {
  const dispatch = useDispatch();
  const [msg, setMsg] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // if (chatDetails === null) setMessages(null);
  };
  // console.log(activeChat);
  const handleClose = () => {
    setClose(true);
  };

  const handleHidden = () => {
    setHidden(!hidden);
  };

  const sendData = () => {
    dispatch(sendMsg(user.id, msg));
    setMsg("");
  };

  const { user } = useSelector((state) => state.authReducer);
  const { client, chats, chatUser } = useSelector((state) => state.chatReducer);

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
    <AppBar
      sx={{
        backgroundColor: "#ffffff00",
        bottom: 0,
        top: "auto",
      }}
      elevation={0}
    >
      <div className={hidden ? "chat-hidden" : "chat"}>
        <div className="user-name">
          <div>
            <h2>
              <Avatar
                src={chatUser.profile_image}
                alt={chatUser.first_name}
                sx={{
                  width: "40px",
                  height: "40px",
                  mr: 1,
                }}
              />
              {chatUser.first_name}
            </h2>
            <span>{chatUser.company}</span>
          </div>

          <div className="chat-icons">
            <FeatherIcon
              id={hidden ? "show" : "hidden"}
              icon={hidden ? "chevron-up" : "chevron-down"}
              width="20"
              height="20"
              onClick={handleHidden}
            ></FeatherIcon>
            <FeatherIcon
              id="close"
              icon="x"
              width="20"
              height="20"
              onClick={handleClose}
            ></FeatherIcon>
          </div>
        </div>

        <div className="chat-message" style={hidden ? { display: "none" } : {}}>
          {chats.map((value, idx) => {
            if (value.id === chatUser.id) {
              return (
                <div key={idx} className="message">
                  <p>{value.msg}</p>
                </div>
              );
            } else {
              return (
                <div key={idx} className="message mess-right">
                  <p>{value.msg}</p>
                </div>
              );
            }
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="send" style={hidden ? { display: "none" } : {}}>
          <input
            placeholder="enter your message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendData();
              }
            }}
          ></input>
          <button onClick={sendData}>Send</button>
        </div>
      </div>
    </AppBar>
  );
};

export default ChatActive;
