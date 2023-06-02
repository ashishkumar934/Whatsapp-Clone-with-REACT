import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./Chatbox.css";
import firebase from "firebase";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Avatar, IconButton } from "@material-ui/core";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { StateContext } from "./Stateprovider";

function Chatbox() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("initial");
  const [messages, setMessages] = useState([]);
  const [user, dispatch] = useContext(StateContext);

  useEffect(() => {
    if (roomId) {
      db.collection("Room")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("Room")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("Room").doc(roomId).collection("messages").add({
      message: input,
      name: user.user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chatbox">
      <div className="chatbox_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chatbox_headerInfo">
          <h3> {roomName} </h3>
          <p>
            {" "}
            Last Seen at
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chatbox_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatbox_body">
        {messages.map((message) => (
          <p
            className={`chatbox_message ${
              message.name === user.user.displayName && "chatbox_reciever"
            }`}
          >
            <span className="chatbox_name">{message.name} </span>
            {message.message}
            <span className="chatbox_timestamp">
              {" "}
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>

      <div className="chatbox_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage} type="submit">
            {" "}
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chatbox;
