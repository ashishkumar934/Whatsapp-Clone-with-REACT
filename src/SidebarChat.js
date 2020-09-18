import React from "react";
import { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";

function Sidebarchat({ id, name, addnewchat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id) {
      db.collection("Room")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomname = prompt("add your room name");
    if (roomname) {
      db.collection("Room").add({
        name: roomname,
      });
    }
  };

  return !addnewchat ? (
    <Link to={`/rooms/${id}`}>
      <div className="SidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="Sidebarchat_info">
          <h2> {name} </h2>
          <p> {messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="SidebarChat">
      <h2> Add New Chat</h2>
    </div>
  );
}

export default Sidebarchat;
