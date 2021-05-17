// import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatApp from "./Components/ChatApp";
import Signup from "./Components/Signup";
import style from "./App.css";
import { useEffect, useState } from "react";
import Login from "./Components/Login";
import app from "./firebase";

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
  uploadImage();
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
          console.log(err.message);
        });
    }
  }, [user]);

  if (user) {
    console.log(user);
  }

  return (
    <div className="App">
      {user ? (
        <ChatApp user={user} />
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
