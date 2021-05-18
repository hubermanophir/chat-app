import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import Message from "./Message";
import firebase from "firebase/app";
import "firebase/firestore";

export default function Chatroom({ user }) {
  const history = useHistory();
  const db = app.firestore();
  const messagesRef = db.collection("messages");
  const messageRef = useRef();
  const inviteRef = useRef();
  const firestore = app.firestore();
  const query = messagesRef
    .where("chatroom_id", "==", history.location.pathname.slice(10))
    .orderBy("createdAt");

  const [allMessages] = useCollectionData(query);

  const addMessage = async () => {
    if (messageRef.current.value === "") {
      return;
    }
    const res = await db
      .collection("users")
      .where("user_UID", "==", user.uid)
      .get();

    const userObj = {};
    res.forEach((doc) => {
      console.log(doc.data());
      userObj.username = doc.data().username;
      userObj.image = doc.data().user_image;
    });

    await db.collection("messages").add({
      chatroom_id: history.location.pathname.slice(10),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      message: messageRef.current.value,
      user_UID: user.uid,
      username: userObj.username,
      user_image: userObj.image,
    });
    messageRef.current.value = "";
  };

  const getUser = async (id) => {
    let theUser;
    const querySnapshot = await firestore
      .collection("users")
      .where("user_UID", "==", id)
      .get();

    querySnapshot.forEach(function (doc) {
      theUser = doc.data();
    });

    return theUser;
  };

  const inviteHandler = async () => {
    db.collection("chatrooms")
      .where("chatroom_id", "==", history.location.pathname.slice(10))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const temp = doc.data().participants;
          const theUser = await getUser(inviteRef.current.value);
          console.log(doc.data());
          temp.push({ user_UID: theUser.user_UID, username: theUser.username });
          console.log(temp);
          // doc.set({ participants: temp });
        });
      });
  };

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
      <input ref={messageRef} type="text" />
      <button onClick={addMessage}>send</button>
      {/* <div>
        <input ref={inviteRef} type="text" />
        <button onClick={inviteHandler}>invite</button>
      </div> */}
      <div>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
}
