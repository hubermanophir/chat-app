import React, { useState } from "react";
import firebase from "firebase";
import FormDialog from "./FormDialog";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const firestore = app.firestore();
const chatRef = firestore.collection("chatrooms");

export default function ChatApp({ user }) {
  const [chatRooms] = useCollectionData(chatRef, { idField: "id" });
  console.log(chatRooms);
  return (
    <div>
      <FormDialog user={user} />
      {chatRooms
        ? chatRooms.map((room) => {
            return (
              <Link to={`/chatroom/${room.chatroom_id}`}>
                {room.chatroom_name}
              </Link>
            );
          })
        : null}
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </div>
  );
}
