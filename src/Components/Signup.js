import firebase from "firebase";
import React, { useState } from "react";
import app from "../firebase";

export default function Signup({ user, username, setUsername }) {
  const [signUpOpen, setSignUpOpen] = useState(false);

  const [email, setEmail] = useState();

  const [password, setPassword] = useState();
  const [imageFile, setImageFile] = useState();
  const [imgUrl, setImgUrl] = useState();
  const storage = app.storage();
  const firestore = app.firestore();
  const usersRef = firestore.collection("users");

  const createUser = async (id, image, username) => {
    usersRef.add({
      user_UID: id,
      user_image: image,
      username,
    });
  };

  const signUpWithMail = (e) => {
    e.preventDefault();
    if (imageFile == null || username == null) {
      return;
    }
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        firebase
          .storage()
          .ref(`user_images/${user.uid}.png`)
          .put(imageFile)
          .then(async () => {
            const url = await storage
              .ref(`user_images/${user.uid}.png`)
              .getDownloadURL();
            createUser(user.uid, url, username);
          })
          .catch((error) => console.log(error.message));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div>
      {/* <button onClick={signUpWithGoogle}>Sign in Using Google</button>
			<button onClick={signUpWithFacebook}>Sign in Using Facebook</button> */}
      <div className="dont-have" onClick={() => setSignUpOpen(!signUpOpen)}>
        Don't have a user yet?
      </div>
      {signUpOpen ? (
        <form>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="password"
          />
          <input
            required
            type="file"
            onChange={(e) => {
              setImageFile(e.target.files[0]);
            }}
          />
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />
          <button onClick={signUpWithMail}>Signup</button>
        </form>
      ) : null}
    </div>
  );
}
