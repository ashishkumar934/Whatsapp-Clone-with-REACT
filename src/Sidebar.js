import React, { useContext } from "react";
import { useState, useEffect } from "react";
import "./sidebar.css";
import db from "./firebase";

import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MessageIcon from "@material-ui/icons/Message";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import SearchIcon from "@material-ui/icons/Search";
import Sidebarchat from "./SidebarChat";
import { useStateValue, StateContext } from "./Stateprovider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [user, dispatch] = useContext(StateContext);

  useEffect(() => {
    const unsubscribe = db.collection("Room").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <IconButton>
          <Avatar src={user.user?.photoURL} />
        </IconButton>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchIcon />
          <input placeholder="Search or Start new Chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chat">
        <Sidebarchat addnewchat="y" />
        {rooms.map((room) => (
          <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
