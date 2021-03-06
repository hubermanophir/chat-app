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
  const [userAllowed, setUserAllowed] = useState(true);
  const [hideLogin, setHideLogin] = useState(false);

  return (
    <div className="App">
      {user ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <ChatApp user={user} />
            </Route>
            <Route exact path="/chatroom/:id">
              <Chatroom
                setUserAllowed={setUserAllowed}
                user={user}
                userAllowed={userAllowed}
              />
            </Route>
          </Switch>
        </Router>
      ) : (
        <>
          <h1 className="main-title">Chat App</h1>
          {hideLogin ? null : <Login />}
          {/* <Login /> */}
          <Signup
            user={user}
            username={username}
            setHideLogin={setHideLogin}
            setUsername={setUsername}
            hideLogin={hideLogin}
          />
        </>
      )}
    </div>
  );
}

export default App;
