import React, { useState } from "react";
import app from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    console.log(email, password);
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
      })
      .catch((err) => {
        console.log("invalid");
      });
  };

  return (
    <div className="login-div">
      <div>
        <form className="login-input-container">
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email"
            className="login-email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="password"
            className="login-password"
          />
          <button className="login-button" onClick={signIn}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
