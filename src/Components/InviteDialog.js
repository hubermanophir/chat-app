import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import app from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { IconButton, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function InviteDialog({ user, chatPassword }) {
  const [open, setOpen] = React.useState(false);
  const firestore = app.firestore();
  const history = useHistory();

  const [userUid, setUserUid] = useState("");

  const db = app.firestore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const createHandler = async () => {
    db.collection("chatrooms")
      .where("chatroom_id", "==", history.location.pathname.slice(10))
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const temp = doc.data().participants;
          const theUser = await getUser(userUid);
          temp.push({ user_UID: theUser.user_UID, username: theUser.username });
          const obj = Object.assign({}, doc.data());
          obj.participants = temp;
          db.collection("chatrooms")
            .doc(history.location.pathname.slice(10))
            .set(obj);
        });
      });
    setOpen(false);
  };

  return (
    <div className="invitation-div">
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Invitation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invite</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="user-uid-input"
            label="User ID"
            type="text"
            fullWidth
            onChange={(e) => setUserUid(e.target.value)}
          />
        </DialogContent>
        <Paper>
          <DialogTitle id="chat-password">{chatPassword}</DialogTitle>
          <IconButton
            IconButton
            type="submit"
            aria-label="search"
            onClick={() => {
              navigator.clipboard.writeText(chatPassword);
            }}
          >
            <FileCopyIcon />
          </IconButton>
        </Paper>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createHandler} color="primary">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
