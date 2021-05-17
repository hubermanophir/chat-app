import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import app from "../firebase";
// import { collection, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function FormDialog({ user }) {
  const [open, setOpen] = React.useState(false);
  const firestore = app.firestore();
  const [chatroomName, setChatroomName] = useState();
  const chatRef = firestore.collection("chatrooms");
  const usersRef = firestore.collection("users");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUser = async () => {
    let theUser;
    const querySnapshot = await firestore
      .collection("users")
      .where("user_UID", "==", user.uid)
      .get();

    querySnapshot.forEach(function (doc) {
      theUser = doc.data();
    });

    return theUser;
  };

  const createHandler = async () => {
    const theUser = await getUser();
    chatRef
      .add({
        chatroom_id: uuidv4(),
        chatroom_name: chatroomName,
        participants: [
          { user_UID: theUser.user_UID, username: theUser.username },
        ],
      })
      .then((res) => {
        console.log("added successfully");
      })
      .catch(() => {
        console.log("error");
      });
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Create Chatroom
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create chatroom</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Chatroom name"
            type="text"
            fullWidth
            onChange={(e) => setChatroomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createHandler} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
