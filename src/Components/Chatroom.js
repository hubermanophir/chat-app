import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import app from "../firebase";
import Message from "./Message";
import firebase from "firebase/app";
import "firebase/firestore";
import InviteDialog from "./InviteDialog";

export default function Chatroom({ user, setUserAllowed, userAllowed }) {
  const [chatPassword, setChatPassword] = useState("");
  const firestore = app.firestore();
  const history = useHistory();
  const db = app.firestore();
  const messagesRef = db.collection("messages");
  const messageRef = useRef();
  const passwordRef = useRef();
  const query = messagesRef
    .where("chatroom_id", "==", history.location.pathname.slice(10))
    .orderBy("createdAt");

  const [allMessages] = useCollectionData(query);

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

  const addUser = async () => {
    db.collection("chatrooms")
      .where("chatroom_id", "==", history.location.pathname.slice(10))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const temp = doc.data().participants;
          const theUser = await getUser(user.uid);
          temp.push({ user_UID: theUser.user_UID, username: theUser.username });
          const obj = Object.assign({}, doc.data());
          obj.participants = temp;
          db.collection("chatrooms")
            .doc(history.location.pathname.slice(10))
            .set(obj);
        });
      });
  };

  const setPasswordState = async () => {
    let chatroom;
    const res = await db
      .collection("chatrooms")
      .where("chatroom_id", "==", history.location.pathname.slice(10))
      .get();

    res.forEach((doc) => {
      chatroom = doc.data();
    });
    setChatPassword(chatroom.password);
  };

  const userInChat = async () => {
    let chatroom;
    const res = await db
      .collection("chatrooms")
      .where("chatroom_id", "==", history.location.pathname.slice(10))
      .get();

    res.forEach((doc) => {
      chatroom = doc.data();
    });

    let bool = false;
    chatroom.participants.forEach((person) => {
      if (person.user_UID === user.uid) {
        bool = true;
      }
    });

    if (bool) {
      setUserAllowed(true);
    } else {
      setUserAllowed(false);
    }
  };

  useEffect(() => {
    userInChat();
    setPasswordState();
  }, []);

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

  const submitPassword = () => {
    if (passwordRef.current.value === chatPassword) {
      setUserAllowed(true);
      addUser();
    } else {
      return;
    }
  };

  return (
    <div>
      <h1>Chatroom</h1>
      {userAllowed ? (
        <>
          {allMessages
            ? allMessages.map((message, i) => {
                return (
                  <Message key={`message ${i}`} message={message} user={user} />
                );
              })
            : null}
          <input ref={messageRef} type="text" />
          <button onClick={addMessage}>send</button>
          <div>
            <InviteDialog user={user} chatPassword={chatPassword} />
          </div>
        </>
      ) : (
        <>
          <h2>Enter chat password</h2>
          <input type="text" placeholder="password" ref={passwordRef} />
          <button onClick={submitPassword}>ok</button>
        </>
      )}
      <div>
        <Link to="/">Go back home</Link>
      </div>
    </div>
  );
}
