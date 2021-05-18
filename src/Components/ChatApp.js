import React, { useEffect, useState } from "react";
import firebase from "firebase";
import FormDialog from "./FormDialog";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import IdForm from "./IdForm";
import { Button } from "@material-ui/core";
const firestore = app.firestore();
const chatRef = firestore.collection("chatrooms");

export default function ChatApp({ user }) {
  const db = app.firestore();
  const usersRef = db.collection("users");
  const [chatRooms] = useCollectionData(chatRef);
  const [myChatrooms, setMyChatrooms] = useState([]);
  useEffect(() => {
    if (chatRooms) {
      let temp = chatRooms.map((room) => {
        let bool = false;
        room.participants.forEach((person) => {
          if (person.user_UID === user.uid) {
            bool = true;
          }
        });
        if (bool) {
          return room;
        }
      });

      temp = temp.filter((element) => {
        return element !== undefined;
      });

      setMyChatrooms(temp);
    }
  }, [chatRooms]);

  return (
    <div>
      <FormDialog user={user} />
      {myChatrooms
        ? myChatrooms.map((room) => {
            return (
              <div>
                <Link to={`/chatroom/${room.chatroom_id}`}>
                  {room.chatroom_name}
                </Link>
              </div>
            );
          })
        : null}
      <IdForm user={user} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => app.auth().signOut()}
      >
        Sign Out
      </Button>
      {/* <button onClick={() => app.auth().signOut()}>Sign Out</button> */}
    </div>
  );
}
