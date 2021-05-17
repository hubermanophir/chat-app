// import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatApp from "./Components/ChatApp";
import Signup from "./Components/Signup";
import style from "./App.css";
import { useEffect, useState } from "react";
import Login from "./Components/Login";
import app from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Chatroom from "./Components/Chatroom";

const auth = app.auth();
const firestore = app.firestore();
const storage = app.storage();

const usersRef = firestore.collection("users");

function App() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState();

  function saveUserToFirestore(image_url) {
    usersRef
      .add({
        user_UID: user.uid,
        user_image: image_url,
        username: username,
      })
      .then((response) => {
        console.log("added success");
        console.log(response);
      })
      .catch((err) => {
        console.log("didnt add");
        console.log(err.message);
      });
  }

  function uploadImage() {
    if (user) {
      storage
        .ref(`user_images/${user.uid}.png`)
        .getDownloadURL()
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    }
  }
  // uploadImage();
  useEffect(() => {
    if (user) {
      storage
        .ref(`user_images/${user.uid}.png`)
        .getDownloadURL()
        .then((res) => {
          saveUserToFirestore(res);
          // console.log(res);
        })
        .catch((err) => {
          // console.log(err.message);
        });
    }
  }, [user]);
  return (
    <div className="App">
      {user ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <ChatApp user={user} />
            </Route>
            <Route exact path="/chatroom/:id">
              <Chatroom user={user} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <>
          <Login />
          <Signup user={user} username={username} setUsername={setUsername} />
        </>
      )}
    </div>
  );
}

export default App;
