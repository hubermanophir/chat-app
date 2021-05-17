import React, { useState } from "react";
import firebase from "firebase";
import FormDialog from "./FormDialog";
import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../firebase";

export default function ChatApp({ user }) {
  const firestore = app.firestore();
  const chatRef = firestore.collection("chatrooms");

  chatRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.data();
    });
  });

  return (
    <div>
      <FormDialog user={user} />
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
    </div>
  );
}
