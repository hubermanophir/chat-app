import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import Message from "./Message";

export default function Chatroom({ user }) {
  const history = useHistory();
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const db = app.firestore();
  const messagesRef = db.collection("messages");

  const query = messagesRef
    .where("chatroom_id", "==", history.location.pathname.slice(10))
    .orderBy("createdAt");

  const [allMessages] = useCollectionData(query);
  console.log(allMessages);
  console.log(user.uid);
  return (
    <div>
      <h1>Chatroom</h1>
      {allMessages
        ? allMessages.map((message, i) => {
            return (
              <Message key={`message ${i}`} message={message} user={user} />
            );
          })
        : null}
    </div>
  );
}
